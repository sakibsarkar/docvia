import { Request, Response } from "express";
import { readFileSync } from "fs";
import jwt from "jsonwebtoken";
import { join } from "path";
import { v4 } from "uuid";
import { stripe } from "../../../app";
import config from "../../config";
import AppError from "../../errors/AppError";
import prisma from "../../lib/prisma";
import catchAsyncError from "../../utils/catchAsync";
import sendResponse from "../../utils/send.response";
import userUtils from "../../utils/user.utils";
import { ISubscriptionCheckoutSessionPayload } from "./subscription.interface";

const createSubscription = catchAsyncError(async (req, res) => {
  const userId = req.user!.id;
  const planId = req.body.planId;
  const plan = await prisma.plan.findUnique({
    where: { id: planId },
  });

  if (!plan) {
    throw new AppError(404, "Plan not found");
  }
  const productsList = await stripe.products.list({
    limit: 100,
  });

  const priceId = productsList.data.find((product) => product.id === plan.stripeProdId);

  if (!priceId || !priceId?.default_price) {
    throw new AppError(404, "Plan not found");
  }

  const customerId = await userUtils.getUserCustomeridByUserId(userId);

  const ulrs = {
    success: config.SERVER_URL + "/api/v1/subscription/confirm",
    cancel: config.SERVER_URL + "/api/v1/subscription/cancel",
  };

  const subscriptionModelId = v4();

  const payloadData: ISubscriptionCheckoutSessionPayload = {
    id: subscriptionModelId,
    userId,
  };

  const token = jwt.sign(payloadData, config.ACCESS_TOKEN.SECRET as string, { expiresIn: "5m" });

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    payment_method_types: ["card"],
    line_items: [
      {
        price: priceId.default_price as string,
        quantity: 1,
      },
    ],
    metadata: {
      internalSubId: subscriptionModelId,
      userId,
    },
    allow_promotion_codes: true,
    customer: customerId,
    success_url: ulrs.success + `?sub_token=${token}`,
    cancel_url: ulrs.cancel + `?sub_token=${token}`,
  });

  await prisma.subscription.create({
    data: {
      id: subscriptionModelId,
      status: "incomplete",
      user: userId,
      stripeSubscriptionId: "",
      stripeCustomerId: customerId,
      planId: plan.id,
      startDate: new Date(),
      price: plan.price,
    },
  });

  sendResponse(res, {
    success: true,
    statusCode: 200,
    data: session.url,
    message: "Checkout session link",
  });
});

const subscriptionPaymentConfirm = catchAsyncError(async (req, res) => {
  const token = req.query.sub_token;
  let decoded: undefined | ISubscriptionCheckoutSessionPayload = undefined;
  try {
    decoded = jwt.verify(token as string, config.ACCESS_TOKEN.SECRET as string) as {
      id: string;
      userId: string;
    };
  } catch {
    sendResponse(res, {
      data: null,
      success: false,
      message: "invalid payment info",
      statusCode: 400,
    });
  }

  if (!decoded) {
    return sendResponse(res, {
      data: null,
      success: false,
      message: "invalid payment info",
      statusCode: 400,
    });
  }

  await prisma.user.update({
    where: { id: decoded.userId },
    data: {
      currentSubscriptionId: decoded.id,
    },
  });

  const filePath = join(__dirname, "../../templates/success.html");
  let file = readFileSync(filePath, "utf-8");
  file = file.replace("{{link}}", config.frontend_base_url!);
  res.send(file);
});

const stripeWebhookController = async (req: Request, res: Response) => {
  const sig = req.headers["stripe-signature"] as string;

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, config.STRIPE_WEBHOOK_SECRET!);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.error("❌ Webhook signature verification failed:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    if (session.mode === "subscription" && typeof session.subscription === "string") {
      try {
        // ✅ Fetch full subscription to get metadata

        const internalSubId = session.metadata?.internalSubId;
        const userId = session.metadata?.userId;

        if (!internalSubId || !userId) {
          console.warn("⚠️ Metadata missing in subscription");
          return res.status(200).send("No metadata, skipping DB update");
        }

        // ✅ Now update DB
        await prisma.subscription.update({
          where: { id: internalSubId },
          data: {
            status: "active",
            stripeSubscriptionId: session.subscription,
          },
        });

        await prisma.user.update({
          where: { id: userId },
          data: {
            currentSubscriptionId: internalSubId,
          },
        });

        console.log("✅ Subscription activated via webhook for user:", userId);
      } catch (error) {
        console.error("🔴 Failed to fetch subscription or update DB:", error);
        return res.status(500).send("Internal error");
      }
    }
  }

  return res.status(200).send("Webhook received");
};

const subscriptionController = {
  createSubscription,
  subscriptionPaymentConfirm,
  stripeWebhookController,
};

export default subscriptionController;
