import { Router } from "express";
import { downloadPdf, generatePdf, previewPdf } from "../controllers/pdfController";
import { validate } from "../middleware/validate";
import { pdfRequestSchema } from "../validators/pdfValidator";

const router = Router();

router.post("/generate", validate(pdfRequestSchema), generatePdf);
router.post("/preview", validate(pdfRequestSchema), previewPdf);
router.post("/download", validate(pdfRequestSchema), downloadPdf);

export default router;
