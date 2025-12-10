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

const handleSubscriptionUpdate = async (session: Stripe.Subscription) => {
  const isActive = session.status === "active";

  if (!isActive) {
    return { status: 201, message: "Invalid session. Subscription not active" };
  }

  const priceId = session.items.data[0].price.id;
  const userId = session.metadata?.userId;
  const customerId = typeof session.customer === "string" ? session.customer : session.customer.id;

  const updatedPlan = await prisma.plan.findFirst({
    where: {
      stripePriceId: priceId,
    },
    select: {
      id: true,
      price: true,
    },
  });

  if (!updatedPlan) {
    return { status: 400, message: "Plan not found" };
  }

  const userFindQuery: { id?: string; stripeCustomerId?: string } = {};

  if (userId) {
    userFindQuery["id"] = userId;
  } else if (customerId) {
    userFindQuery["stripeCustomerId"] = customerId;
  }

  let currentSubId: string | null = null;
  if (Object.entries(userFindQuery).length) {
    const subscription = await prisma.subscription.create({
      data: {
        price: updatedPlan.price,
        startDate: new Date(),
        status: "active",
        stripeCustomerId: customerId,
        stripeSubscriptionId: session.id,
        planId: updatedPlan.id,
        userId: userId,
      },
    });

    const user = await prisma.user.findFirst({
      where: userFindQuery,
      select: {
        currentSubscriptionId: true,
        id: true,
      },
    });
    if (user) {
      currentSubId = user.currentSubscriptionId;
      await prisma.user.update({
        where: { id: user.id },
        data: {
          currentSubscriptionId: subscription.id,
        },
      });
    }
  }

  if (currentSubId) {
    const isSubExisting = await prisma.subscription.findUnique({
      where: { id: currentSubId },
      select: { id: true },
    });
    if (isSubExisting) {
      await prisma.subscription.update({
        where: { id: currentSubId },
        data: {
          status: "canceled",
        },
      });
    }
  }

  return { status: 200, message: "Subscription updated" };
};
const handleSubscriptionCanceled = async (session: Stripe.Subscription) => {
  const isCanceled = session.status === "canceled";
  const userId = session.metadata?.userId;
  const customerId = typeof session.customer === "string" ? session.customer : session.customer.id;

  if (!isCanceled) {
    return { status: 201, message: "Invalid session. Subscription not canceled" };
  }

  let previousTrialPlan = await prisma.subscription.findFirst({
    where: { userId: session.metadata?.userId, price: 0 },
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
        stripeCustomerId: customerId,
        planId: freePlanId,
        price: 0,
        startDate: new Date(),
      },
    });
  } else {
    await prisma.subscription.update({
      where: {
        id: previousTrialPlan.id,
      },
      data: {
        status: "active",
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
        userId: session.metadata?.userId,
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
  const userFindQuery: { id?: string; stripeCustomerId?: string } = {};
  let currentSubId: string | null = null;

  if (userId) {
    userFindQuery["id"] = userId;
  } else if (customerId) {
    userFindQuery["stripeCustomerId"] = customerId;
  }

  const user = await prisma.user.findFirst({
    where: userFindQuery,
    select: {
      currentSubscriptionId: true,
      id: true,
    },
  });
  if (user) {
    currentSubId = user.currentSubscriptionId;
    await prisma.user.update({
      where: {
        id: session.metadata?.userId,
      },
      data: {
        currentSubscriptionId: previousTrialPlan.id,
      },
    });
  }
  if (currentSubId) {
    const isSubExisting = await prisma.subscription.findUnique({
      where: { id: currentSubId },
      select: { id: true },
    });
    if (isSubExisting) {
      await prisma.subscription.update({
        where: { id: currentSubId },
        data: {
          status: "canceled",
        },
      });
    }
  }
  return { status: 200, message: "Subscription Canceled" };
};

const updateSubscriptionStatusFromInvoice = async (
  invoice: Stripe.Invoice,
  newStatus: "active" | "past_due"
) => {
  const status = invoice.status === "paid";
  if (status) {
    return { status: 400, message: "Invoice already paid" };
  }
  const customerId = typeof invoice.customer === "string" ? invoice.customer : invoice.customer?.id;

  const invoiceSubscription: Stripe.Subscription | string =
    // @ts-expect-error invoice mayhave subscription
    invoice.lines.data[0]?.subscription || invoice.subscription;

  const subscriptionId =
    typeof invoiceSubscription === "string" ? invoiceSubscription : invoiceSubscription?.id;

  if (subscriptionId) {
    const subscription = await prisma.subscription.findFirst({
      where: { stripeSubscriptionId: subscriptionId },
    });
    if (subscription) {
      await prisma.subscription.update({
        where: { id: subscription.id },
        data: {
          status: newStatus,
        },
      });
    }
    return { status: 200, message: "Subscription marked as due" };
  } else if (customerId) {
    const user = await prisma.user.findFirst({
      where: { stripeCustomerId: customerId },
      select: {
        id: true,
        currentSubscriptionId: true,
      },
    });

    if (user) {
      const subscription = await prisma.subscription.findFirst({
        where: { id: user.currentSubscriptionId },
        select: {
          id: true,
        },
      });
      if (subscription) {
        await prisma.subscription.update({
          where: { id: subscription.id },
          data: {
            status: newStatus,
          },
        });
      }
    } else {
      return { status: 200, message: "Subscription marked as due" };
    }
    return { status: 200, message: "Subscription marked as due" };
  } else {
    return { status: 400, message: "Invoice has no subscription" };
  }
};

const mainHook = async (req: Request, res: Response) => {
  const sig = req.headers["stripe-signature"] as string;

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, config.STRIPE_WEBHOOK_SECRET!);

    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object;
        const { message, status } = await handleCheckoutSessionSuccess(session);
        return res.status(status).send(message);
      }

      case "customer.subscription.updated": {
        const subscription = event.data.object;
        const { message, status } = await handleSubscriptionUpdate(subscription);
        return res.status(status).send(message);
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object;
        const { message, status } = await handleSubscriptionCanceled(subscription);
        return res.status(status).send(message);
      }

      case "invoice.payment_failed": {
        const invoice = event.data.object;
        const { message, status } = await updateSubscriptionStatusFromInvoice(invoice, "past_due");
        return res.status(status).send(message);
      }
      case "invoice.payment_succeeded": {
        const invoice = event.data.object;
        const { message, status } = await updateSubscriptionStatusFromInvoice(invoice, "past_due");
        return res.status(status).send(message);
      }

      default:
        return res.status(400).send("Unhandled event type");
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.error("❌ Webhook signature verification failed:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }
};

const subscriptionWebhook = {
  mainHook,
};

export default subscriptionWebhook;
