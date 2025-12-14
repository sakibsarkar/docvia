import { Router } from "express";
import authMiddleware from "../../middlewares/authMiddleware";
import appStatisticsController from "./appStatistics.controller";

const router = Router();

router.use(authMiddleware.isAuthenticateUser());
router.get("/overview/:appId", appStatisticsController.appOverview);
router.get("/visitor-statistics/:appId", appStatisticsController.visitorStatistics);
router.get("/chat-statistics/:appId", appStatisticsController.chatStatistics);

const appStatisticsRoute = router;
export default appStatisticsRoute;
