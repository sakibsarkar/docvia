import { v4 } from "uuid";
import AppError from "../../errors/AppError";
import prisma from "../../lib/prisma";
import planSeed, { freePlanId } from "../../utils/plan.utils";
import userUtils from "../../utils/user.utils";

interface IProps {
  durationInMonths: number;
  createdAt: string | Date;
}

const isDurationOver = (payload: IProps): boolean => {
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

const createNewFreeTrial = async (userId: string, stripeCustomerId?: string) => {
  const plan = await prisma.plan.findUnique({
    where: {
      id: freePlanId,
    },
  });

  if (!plan) {
    await planSeed();
  }

  const subscriptionId = v4();
  const customerId = stripeCustomerId || (await userUtils.getUserCustomeridByUserId(userId));
  const subscription = await prisma.subscription.create({
    data: {
      id: subscriptionId,
      status: "active",
      userId: userId,
      stripeCustomerId: customerId,
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

  return subscription;
};

const getUserCurrentSubscriptionId = async (userId: string) => {
  const userInfo = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      currentSubscriptionId: true,
      stripeCustomerId: true,
    },
  });

  if (!userInfo) {
    throw new AppError(400, "User not found");
  }

  if (userInfo.currentSubscriptionId) {
    return userInfo.currentSubscriptionId;
  }

  const subscription = await createNewFreeTrial(userId, userInfo.stripeCustomerId || undefined);

  return subscription.id;
};

const subscriptionUtils = {
  getUserCurrentSubscriptionId,
  isDurationOver,
  createNewFreeTrial,
};
export default subscriptionUtils;
