import { v4 } from "uuid";
import { stripe } from "../../app";
import AppError from "../errors/AppError";
import prisma from "../lib/prisma";
import planSeed, { freePlanId } from "./plan.utils";

interface IProps {
  durationInMonths: number;
  createdAt: string;
}

export const isDurationOver = (payload: IProps): boolean => {
  const { createdAt, durationInMonths } = payload;
  const createdDate = new Date(createdAt);

  // Add the duration in months
  const expirationDate = new Date(createdDate);
  expirationDate.setUTCMonth(expirationDate.getUTCMonth() + durationInMonths);

  // Ensure both dates are in UTC and reset time to 00:00:00
  const resetUTCTime = (date: Date) =>
    new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));

  const currentDate = resetUTCTime(new Date()); // Get today's UTC date
  const adjustedExpirationDate = resetUTCTime(expirationDate); // Expiry date in UTC

  return currentDate > adjustedExpirationDate;
};

export const getUserSubscription = async (
  customerId: string,
  userId: string,
  resetSubscription?: boolean
) => {
  const userInfo = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!userInfo) {
    throw new AppError(400, "User not found");
  }

  if (userInfo.currentSubscriptionId && !resetSubscription) {
    return userInfo.currentSubscriptionId;
  }

  const plan = await prisma.plan.findUnique({
    where: {
      id: freePlanId,
    },
  });

  if (!plan) {
    await planSeed();
  }

  const subscriptionId = v4();
  await prisma.subscription.create({
    data: {
      id: subscriptionId,
      status: "active",
      stripeCustomerId: customerId,
      user: userId,
      planId: freePlanId,
      price: 0,
      startDate: new Date(),
    },
  });

  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      currentSubscriptionId: subscriptionId,
    },
  });
  if (userInfo?.currentSubscriptionId) {
    await prisma.subscription.delete({
      where: {
        id: userInfo?.currentSubscriptionId,
      },
    });
  }

  return subscriptionId;
};

// this func is not in use anymore --:
export const isActiveSubscription = async (subscriptionId: string) => {
  const subscription = await stripe.subscriptions.retrieve(subscriptionId);

  // Check the subscription status
  const status = subscription.status;

  return status === "active" || status === "trialing";
};

export const checkUserSubscription = async (currentSubscriptionId: string) => {
  const subscription = await prisma.subscription.findFirst({
    where: {
      id: currentSubscriptionId,
    },
    include: {
      planInfo: true,
    },
  });

  if (!subscription) {
    throw new AppError(404, "Subscription not found");
  }

  if (!subscription.stripeSubscriptionId) {
    throw new AppError(404, "Subscription not valid");
  }
  const isOver = isDurationOver({
    createdAt: subscription.startDate.toString(),
    durationInMonths: subscription.planInfo.durationMonths,
  });
  if (isOver) {
    throw new AppError(403, "Subscription not active");
  }

  return subscription;
};
