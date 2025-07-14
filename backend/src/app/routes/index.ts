import express from "express";
import chatRoute from "./chat.route";
import tempRoute from "./temp.route";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/temp",
    route: tempRoute,
  },
  {
    path: "/chat",
    route: chatRoute,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
