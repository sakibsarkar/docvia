import { User } from "@prisma/client";
import { stripe } from "../../../app";
import config from "../../config";
import AppError from "../../errors/AppError";
import prisma from "../../lib/prisma";
import authUtils from "../../utils/auth.utils";
import catchAsyncError from "../../utils/catchAsync";
import sendResponse from "../../utils/send.response";
const register = catchAsyncError(async (req, res) => {
  const body = req.body as Omit<User, "id" | "stripeCustomerId" | "isVerified" | "role">;
  const { last_name, first_name, email, password, phone_number } = body;

  const user = await prisma.user.findFirst({
    where: {
      OR: [{ email: email }, { phone_number: phone_number }],
    },
  });

  if (user) {
    throw new AppError(400, "User already exist");
  }

  const hashedPassword = await authUtils.hashPassword(password);

  const customer = await stripe.customers.create({
    email,
    name: `${first_name} ${last_name}`,
    phone: phone_number,
  });

  const result = await prisma.user.create({
    data: {
      first_name,
      last_name,
      email,
      password: hashedPassword,
      role: "user",
      stripeCustomerId: customer.id,
      phone_number: phone_number,
      isVerified: false,
    },
    select: {
      id: true,
      first_name: true,
      last_name: true,
      email: true,
      role: true,
      currentSubscriptionId: true,
      isVerified: true,
      phone_number: true,
      avatar: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  const accessToken = authUtils.generateAccessToken({
    id: result.id,
    email: result.email,
    role: result.role,
  });
  const refreshToken = authUtils.generateRefreshToken(result.id);

  res
    .cookie("accessToken", accessToken, {
      sameSite: config.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 1000 * 60 * 60, // 1 hour
      httpOnly: true,
      secure: config.NODE_ENV === "production",
    })
    .cookie("refreshToken", refreshToken, {
      sameSite: config.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 1000 * 24 * 60 * 60 * 30, // 30 days
      httpOnly: true,
      secure: config.NODE_ENV === "production",
    });

  sendResponse(res, {
    success: true,
    statusCode: 200,
    data: result,
    message: "User created successfully",
  });
});
const login = catchAsyncError(async (req, res) => {
  const body = req.body as Pick<User, "email" | "password" | "phone_number">;

  const query: Record<string, unknown> = {};

  if (body.email) {
    query.email = body.email;
  } else if (body.phone_number) {
    query.phone_number = body.phone_number;
  }

  const user = await prisma.user.findFirst({
    where: query,
  });

  if (!user) {
    throw new AppError(403, "Invalid credentials");
  }

  const isPasswordMatch = await authUtils.verifyPassword(body.password, user.password);

  if (!isPasswordMatch) {
    throw new AppError(403, "Invalid credentials");
  }
  if (!user.isVerified) {
    throw new AppError(403, "Please verify your account");
  }

  const accessToken = authUtils.generateAccessToken({
    email: user.email,
    id: user.id,
    role: user.role,
  });

  const refreshToken = authUtils.generateRefreshToken(user.id);
  res
    .cookie("accessToken", accessToken, {
      sameSite: config.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 1000 * 60 * 60, // 1 hour
      httpOnly: true,
      secure: config.NODE_ENV === "production",
    })
    .cookie("refreshToken", refreshToken, {
      sameSite: config.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 1000 * 24 * 60 * 60 * 30, // 30 days
      httpOnly: true,
      secure: config.NODE_ENV === "production",
    });

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Login successful",
    data: { ...user, password: undefined, stripeCustomerId: undefined },
  });
});

const authController = { login, register };

export default authController;
