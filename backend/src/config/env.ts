import dotenv from "dotenv";

dotenv.config();

export const env = {
  nodeEnv: process.env.NODE_ENV ?? "development",
  port: Number(process.env.PORT ?? 5000),
  mongoUri: process.env.MONGODB_URI ?? "mongodb://127.0.0.1:27017/dynamic_pdf_templates",
  frontendUrl: process.env.FRONTEND_URL ?? "http://localhost:5173",
  frontendUrls: (process.env.FRONTEND_URLS ?? process.env.FRONTEND_URL ?? "http://localhost:5173")
    .split(",")
    .map((url) => url.trim())
    .filter(Boolean),
  cloudinary: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME ?? "",
    apiKey: process.env.CLOUDINARY_API_KEY ?? "",
    apiSecret: process.env.CLOUDINARY_API_SECRET ?? ""
  }
};
