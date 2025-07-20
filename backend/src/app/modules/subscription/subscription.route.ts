import { Router } from "express";
import authMiddleware from "../../middlewares/authMiddleware";
import subscriptionController from "./subscription.controller";
const router = Router();

router.post(
  "/create",
  authMiddleware.isAuthenticateUser,
  subscriptionController.createSubscription
);

// hit by stripe checkout session redirect
router.get("/confirm", subscriptionController.subscriptionPaymentConfirm);
router.post("/confirm", subscriptionController.subscriptionPaymentConfirm);

const subscriptionRoute = router;
export default subscriptionRoute;
