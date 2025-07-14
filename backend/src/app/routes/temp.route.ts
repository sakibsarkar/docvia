import { Router } from "express";
import tempController from "../controller/temp.controller";

const router = Router();

router.get("/", tempController.temp);
const tempRoute = router;

export default tempRoute;
