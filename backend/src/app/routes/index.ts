import express from "express";
import authRoute from "../modules/auth/auth.route";
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
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
