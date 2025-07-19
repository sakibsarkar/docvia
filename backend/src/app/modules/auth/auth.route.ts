import { Router } from "express";
import { validSchema } from "../../middlewares/validator";
import authController from "./auth.controller";
import { authValidation } from "./auth.validation";

const router = Router();

router.post("/login", validSchema(authValidation.login), authController.login);
router.post("/register", validSchema(authValidation.register), authController.register);

const authRoute = router;
export default authRoute;
