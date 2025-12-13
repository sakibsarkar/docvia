import { Router } from "express";
import uploadController from "./upload.controller";
import { multerUpload } from "../../config/cloudinaryMulter.config";

const router = Router();

router.post("/single", multerUpload.single("file"), uploadController.uploadSingle);
router.post("/multiple", multerUpload.array("files"), uploadController.uploadMultiple);

const uploadRoute = router;
export default uploadRoute;
