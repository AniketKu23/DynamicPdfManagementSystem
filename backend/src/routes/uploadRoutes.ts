import { Router } from "express";
import { uploadLogo } from "../controllers/uploadController";
import { logoUpload } from "../middleware/upload";

const router = Router();

router.post("/logo", logoUpload.single("logo"), uploadLogo);

export default router;
