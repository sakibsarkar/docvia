import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Application, Request, Response } from "express";
import path from "path";
import Stripe from "stripe";
import config from "./app/config";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import notFound from "./app/middlewares/notFound";
import subscriptionWebhook from "./app/modules/subscription/subscription.webhook";
import router from "./app/routes";
import sendResponse from "./app/utils/send.response";

export const stripe = new Stripe(config.STRIPE_SECRET_KEY as string, {
  apiVersion: "2025-06-30.basil",
});
const app: Application = express();

app.post(
  "/api/v1/subscription/stripe/webhook",
  express.raw({ type: "application/json" }),
  subscriptionWebhook.mainHook
);

app.use("/assets", express.static(path.join(process.cwd(), "public")));
// parsers
app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: (origin, cb) => cb(null, origin || true),
    credentials: true,
  })
);

// application routes
app.use("/api/v1", router);

// test route
app.get("/", async (_req: Request, res: Response) => {
  const session = await stripe.billingPortal.sessions.create({
    customer: "cus_TZFYAh8yx8nx5C",
    return_url: "https://your-website.com/account", // where Stripe redirects after they close the portal
  });

  // const stripeSub = await stripe.subscriptions.retrieve("sub_1ScKOJB8Zk6befohBDZb35Bf");
  sendResponse(res, {
    success: true,
    statusCode: 200,
    data: session.url,
    message: "App is running",
  });
});

app.use(notFound);
// global error handler
app.use(globalErrorHandler);

// not found route

export default app;
