import { GoogleGenerativeAI } from "@google/generative-ai";
import { Request } from "express";
import geoip from "geoip-lite";
import jwt from "jsonwebtoken";
import config from "../../config";
import { IChatBotJWTPayload } from "./chatBot.interface";
const createChatBotAccessToken = (payload: IChatBotJWTPayload) => {
  const { EXPIRY, SECRET = "" } = config.CHAT_BOT_ACCESS_TOKEN;
  const token = jwt.sign(payload, SECRET, { expiresIn: EXPIRY });
  return token;
};

const decodeChatBotAccessToken = (token: string) => {
  const { SECRET } = config.CHAT_BOT_ACCESS_TOKEN;
  try {
    const payload = jwt.verify(token, SECRET!) as IChatBotJWTPayload;
    return payload;
  } catch {
    return null;
  }
};

// for caching use redis in future
const botAccessToken: Record<string, { token: string; expireAt: string }> = {};

export const getBotAccessToken = (appSecret: string) => botAccessToken[appSecret];

export const setBotAccessToken = (
  tokenPayload: {
    token: string;
    expireAt: string;
  },
  appSecret: string
) => {
  botAccessToken[appSecret] = tokenPayload;
};

const getGemini = (model?: string) => {
  const genAI = new GoogleGenerativeAI(config.GEMINI_API_KEY!);

  // For text-only input, use the gemini-pro model
  const genModel = genAI.getGenerativeModel({ model: model || "gemini-2.5-flash" });

  return genModel;
};

// IMPORTANT: trust proxy if behind Vercel / Nginx / Cloudflare

const getClientIp = (req: Request) => {
  return (
    (req.headers["x-forwarded-for"] as string)?.split(",")[0]?.trim() ||
    req.socket.remoteAddress ||
    null
  );
};
const getCountryFromIp = (ip: string | null) => {
  if (!ip) {
    return null;
  }

  const geo = geoip.lookup(ip);
  return geo?.country ?? null; // "US", "BD", "IN"
};
const chatBotUtils = {
  createChatBotAccessToken,
  decodeChatBotAccessToken,
  getGemini,
  getClientIp,
  getCountryFromIp,
};

export default chatBotUtils;
