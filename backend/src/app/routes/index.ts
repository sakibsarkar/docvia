import express from "express";
import authRoute from "../modules/auth/auth.route";
import subscriptionRoute from "../modules/subscription/subscription.route";
import chatRoute from "./chat.route";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/chat",
    route: chatRoute,
  },
  {
    path: "/auth",
    route: authRoute,
  },
  {
    path: "/subscription",
    route: subscriptionRoute,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
