import { stripe } from "../../app";
import AppError from "../errors/AppError";
import prisma from "../lib/prisma";

const getUserCustomeridByUserId = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      stripeCustomerId: true,
      email: true,
      first_name: true,
      last_name: true,
      phone_number: true,
    },
  });

  if (!user) {
    throw new AppError(404, "User not found");
  }

  if (user.stripeCustomerId) {
    return user.stripeCustomerId;
  }

  const customer = await stripe.customers.create({
    email: user.email,
    name: `${user.first_name} ${user.last_name}`,
    phone: user.phone_number,
  });

  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      stripeCustomerId: customer.id,
    },
  });

  return customer.id;
};

const userUtils = {
  getUserCustomeridByUserId,
};

export default userUtils;
