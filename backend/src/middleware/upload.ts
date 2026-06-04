import path from "path";
import multer from "multer";
import { ApiError } from "../utils/ApiError";

const storage = multer.diskStorage({
  destination: "uploads",
  filename: (_req, file, cb) => {
    const extension = path.extname(file.originalname).toLowerCase();
    cb(null, `logo-${Date.now()}${extension}`);
  }
});

export const logoUpload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (!["image/png", "image/jpeg", "image/webp", "image/svg+xml"].includes(file.mimetype)) {
      cb(new ApiError(400, "Only PNG, JPEG, WEBP, or SVG logos are allowed"));
      return;
    }
    cb(null, true);
  }
});
