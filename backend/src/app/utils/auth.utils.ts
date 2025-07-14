import bcrypt from "bcrypt";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import config from "../config";
import { IUserJWTPayload } from "../interface/auth.interface";

const generateAccessToken = (payload: IUserJWTPayload) => {
  const { EXPIRY, SECRET = "" } = config.ACCESS_TOKEN;

  const token = jwt.sign(payload, SECRET, { expiresIn: EXPIRY });
  return token;
};

const generateRefreshToken = (id: string) => {
  const { EXPIRY, SECRET = "" } = config.REFRESH_TOKEN;
  const token = jwt.sign({ _id: id }, SECRET, { expiresIn: EXPIRY });
  return token;
};
const generateForgotPasswordToken = (id: string) => {
  const { EXPIRY, SECRET = "" } = config.RECOVERY_TOKEN;
  const token = jwt.sign({ userId: id }, SECRET, { expiresIn: EXPIRY });
  return token;
};

const generateOTP = (length = 6) => {
  const otp = crypto.randomInt(0, Math.pow(10, length)).toString().padStart(length, "0");
  return otp;
};

const verifyAccessToken = (token: string) => {
  const { SECRET = "" } = config.ACCESS_TOKEN;
  const payload = jwt.verify(token, SECRET);
  return payload;
};
const hashPassword = (password: string) => {
  const hash = bcrypt.hash(password, 10);
  return hash;
};
const sendMessage = async (data: { html: string; receiverMail: string; subject: string }) => {
  // under construction
  return data;
};
const sendEmail = async (data: { html: string; receiverMail: string; subject: string }) => {
  // under construction
  return data;
};
const authUtils = {
  generateAccessToken,
  generateRefreshToken,
  generateOTP,
  verifyAccessToken,
  generateForgotPasswordToken,
  hashPassword,
  sendMessage,
  sendEmail,
};

export default authUtils;
