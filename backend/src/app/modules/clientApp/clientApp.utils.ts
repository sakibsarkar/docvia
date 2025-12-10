import { AppWidget } from "@prisma/client";
import { createHash, randomBytes } from "crypto";
import { v4 } from "uuid";

function generateAppApiKey() {
  const first = randomBytes(5).toString("hex");
  const second = v4().slice(0, 5);
  const third = v4().slice(0, 5);
  const key = `${first}_${second}_${third}`;
  const hashKey = createHash("sha1").update(key).digest("hex");

  return hashKey;
}

const defaultAppWidget: Omit<AppWidget, "id" | "createdAt" | "updatedAt" | "appId"> = {
  agentName: "Agent",
  agentPhoto: null,
  headerColor: "#3b82f6",
  headerTextColor: "#ffffff",
  agentMessageColor: "#1f2937",
  agentTextColor: "#ffffff",
  visitorMessageColor: "#3b82f6",
  visitorTextColor: "#ffffff",
};

const clientAppUtils = {
  generateAppApiKey,
  defaultAppWidget,
};

export default clientAppUtils;
