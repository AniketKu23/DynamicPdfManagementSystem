import fs from "fs/promises";
import { Request, Response } from "express";
import { cloudinary } from "../config/cloudinary";
import { env } from "../config/env";
import { asyncHandler } from "../utils/asyncHandler";
import { sendSuccess } from "../utils/responses";
import { ApiError } from "../utils/ApiError";

export const uploadLogo = asyncHandler(async (req: Request, res: Response) => {
  if (!req.file) throw new ApiError(400, "Logo file is required");

  let url = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
  if (env.cloudinary.cloudName) {
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "dynamic-pdf-template-logos",
      resource_type: "image"
    });
    url = result.secure_url;
    await fs.unlink(req.file.path).catch(() => undefined);
  }

  sendSuccess(res, { url }, "Logo uploaded", 201);
});
