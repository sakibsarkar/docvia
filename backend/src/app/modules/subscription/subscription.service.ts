import jwt from "jsonwebtoken";
import { join } from "path";
import { v4 } from "uuid";
import { stripe } from "../../../app";
import config from "../../config";
import AppError from "../../errors/AppError";
import prisma from "../../lib/prisma";
import { getFileContent } from "../../utils";
import userUtils from "../../utils/user.utils";
import { ISubscriptionCheckoutSessionPayload } from "./subscription.interface";
import subscriptionUtils from "./subscription.utils";
const successFilePath = join(__dirname, "../../templates/success.html");
const failedFilePath = join(__dirname, "../../templates/error.html");
const createSubscription = async (userId: string, planId: string) => {
  const plan = await prisma.plan.findUnique({
    where: { id: planId },
  });

  if (!plan) {
    throw new AppError(404, "Plan not found");
  }

  const priceId = plan.stripePriceId;

  if (!priceId) {
    throw new AppError(402, "Cant create subscription");
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
        price: priceId,
        quantity: 1,
      },
    ],
    metadata: {
      internalSubId: subscriptionModelId,
      userId,
    },
    subscription_data: {
      metadata: {
        internalSubId: subscriptionModelId,
        userId,
      },
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
      userId: userId,
      trialPeriodDays: plan.trialPeriodDays,
      stripeSubscriptionId: "",
      stripeCustomerId: customerId,
      planId: plan.id,
      startDate: new Date(),
      price: plan.price,
    },
  });

  return session;
};

const getUsersCurrentSubscriptionDetails = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      currentSubscriptionId: true,
    },
  });

  if (!user) {
    throw new AppError(404, "User not found");
  }
  let subscription;
  if (!user.currentSubscriptionId) {
    subscription = await subscriptionUtils.createNewFreeTrial(userId);
  }

  if (!subscription) {
    subscription = await prisma.subscription.findUnique({
      where: { id: user.currentSubscriptionId },
      omit: {
        stripeCustomerId: true,
      },
    });
  }

  let nextBillingDate: Date | null = null;
  if (subscription?.stripeSubscriptionId) {
    try {
      const stripeSub = await stripe.subscriptions.retrieve(subscription.stripeSubscriptionId);
      // Stripe returns `current_period_end` as a Unix timestamp (seconds)
      const current_period_end = stripeSub.items.data?.[0].current_period_end;

      nextBillingDate = new Date(current_period_end * 1000);
    } catch (err) {
      console.warn("Failed to fetch stripe subscription", err);
    }
  }

  const planInfo = await prisma.plan.findUnique({
    where: { id: subscription?.planId },

    select: {
      name: true,
      price: true,
      trialPeriodDays: true,
      appLimit: true,
      customization: true,
      durationMonths: true,
    },
  });

  const appCreated = await prisma.app.count({
    where: {
      userId: userId,
    },
  });

  return {
    ...subscription,
    stripeSubscriptionId: undefined,
    planInfo: {
      ...planInfo,
      appCreated,
    },
    nextBillingDate,
  };
};

const subscriptionPaymentConfirm = async (token?: string) => {
  if (!token) {
    return getFileContent(failedFilePath);
  }

  let decoded: undefined | ISubscriptionCheckoutSessionPayload = undefined;

  try {
    decoded = jwt.verify(token, config.ACCESS_TOKEN.SECRET as string) as {
      id: string;
      userId: string;
    };
  } catch {
    return getFileContent(failedFilePath);
  }

  if (!decoded) {
    return getFileContent(failedFilePath);
  }

  await prisma.user.update({
    where: { id: decoded.userId },
    data: {
      currentSubscriptionId: decoded.id,
    },
  });

  return getFileContent(successFilePath);
};

const subscriptionPaymentCancel = async (token: string) => {
  if (!token) {
    return getFileContent(failedFilePath);
  }

  let decoded: undefined | ISubscriptionCheckoutSessionPayload = undefined;

  try {
    decoded = jwt.verify(token, config.ACCESS_TOKEN.SECRET as string) as {
      id: string;
      userId: string;
    };
  } catch {
    return getFileContent(failedFilePath);
  }

  if (!decoded) {
    return getFileContent(failedFilePath);
  }

  await prisma.subscription.update({
    where: { id: decoded.id },
    data: {
      status: "canceled",
    },
  });

  return getFileContent(failedFilePath);
};

const subscriptionService = {
  createSubscription,
  subscriptionPaymentConfirm,
  subscriptionPaymentCancel,
  getUsersCurrentSubscriptionDetails,
};
export default subscriptionService;
