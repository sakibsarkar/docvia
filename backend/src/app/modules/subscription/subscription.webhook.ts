import { Request, Response } from "express";
import Stripe from "stripe";
import { v4 } from "uuid";
import { stripe } from "../../../app";
import config from "../../config";
import prisma from "../../lib/prisma";
import planSeed, { freePlanId } from "../../utils/plan.utils";

const handleCheckoutSessionSuccess = async (session: Stripe.Checkout.Session) => {
  if (session.mode === "subscription" && typeof session.subscription === "string") {
    try {
      const internalSubId = session.metadata?.internalSubId;
      const userId = session.metadata?.userId;

      if (!internalSubId || !userId) {
        return { status: 400, message: "Metadata missing in subscription" };
      }

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

      return { status: 200, message: "Subscription activated" };
    } catch (error) {
      console.error("🔴 Failed to fetch subscription or update DB:", error);
      return { status: 500, message: "Internal server error" };
    }
  }

  return { status: 400, message: "Invalid session" };
};

const handleSubscriptionUpdate = async (session: Stripe.Subscription, none: string) => {
  return { status: 200, message: "Subscription updated" };
};
const handleSubscriptionCanceled = async (session: Stripe.Subscription, none: string) => {
  const isCanceled = session.status === "canceled";
  const internalSubId = session.metadata?.internalSubId;
  const customerId = session.customer;
  if (!internalSubId) {
    return { status: 400, message: "Metadata missing in subscription" };
  }
  if (!isCanceled) {
    return { status: 201, message: "Invalid session. Subscription not canceled" };
  }

  await prisma.subscription.delete({
    where: { id: internalSubId },
  });

  let previousTrialPlan = await prisma.subscription.findFirst({
    where: { userId: session.metadata?.userId as string, price: 0 },
    orderBy: { createdAt: "desc" },
  });

  if (!previousTrialPlan) {
    const plan = await prisma.plan.findFirst({
      where: {
        price: 0,
      },
      select: {
        id: true,
      },
    });

    if (!plan) {
      await planSeed();
    }
    const subscriptionId = v4();

    previousTrialPlan = await prisma.subscription.create({
      data: {
        id: subscriptionId,
        status: "active",
        userId: session.metadata?.userId,
        stripeCustomerId: typeof customerId === "string" ? customerId : customerId.id,
        planId: freePlanId,
        price: 0,
        startDate: new Date(),
      },
    });
  }

  let planLimitation = await prisma.plan.findFirst({
    where: {
      price: 0,
    },
  });

  if (!planLimitation) {
    planLimitation = (await planSeed()) || null;
  }

  if (planLimitation) {
    const appLimit = planLimitation.appLimit;

    const totalActiveApps = await prisma.app.count({
      where: {
        userId: session.metadata?.userId as string,
        isActive: true,
      },
    });

    if (totalActiveApps > appLimit) {
      const userApps = await prisma.app.findMany({
        where: { userId: session.metadata?.userId },
        orderBy: { createdAt: "asc" },
        skip: 0,
        take: totalActiveApps - appLimit,
        select: { id: true },
      });

      await prisma.app.updateMany({
        where: { id: { in: userApps.map((app) => app.id) } },
        data: { isActive: false },
      });
    }
  }

  await prisma.user.update({
    where: {
      id: session.metadata?.userId as string,
    },
    data: {
      currentSubscriptionId: previousTrialPlan.id,
    },
  });

  return { status: 200, message: "Subscription Canceled" };
};

const mainHook = async (req: Request, res: Response) => {
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
    const { message, status } = await handleCheckoutSessionSuccess(session);

    return res.status(status).send(message);
  } else if (event.type === "customer.subscription.updated") {
    const subscription = event.data.object;
    const { message, status } = await handleSubscriptionUpdate(subscription, "update");

    return res.status(status).send(message);
  } else if (event.type === "customer.subscription.deleted") {
    const subscription = event.data.object;
    const { message, status } = await handleSubscriptionCanceled(subscription, "cancel");

    return res.status(status).send(message);
  }

  return res.status(200).send("Webhook received");
};

const subscriptionWebhook = {
  mainHook,
};

export default subscriptionWebhook;
