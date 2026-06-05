import path from "path";
import compression from "compression";
import cors from "cors";
import express from "express";
import mongoSanitize from "express-mongo-sanitize";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import swaggerUi from "swagger-ui-express";
import xss from "xss-clean";
import { env } from "./config/env";
import { swaggerSpec } from "./docs/swagger";
import { errorHandler, notFound } from "./middleware/errorHandler";
import pdfRoutes from "./routes/pdfRoutes";
import templateRoutes from "./routes/templateRoutes";
import uploadRoutes from "./routes/uploadRoutes";

export const createApp = () => {
  const app = express();

  app.set("trust proxy", 1);
  app.use(helmet({ contentSecurityPolicy: false }));
  app.use(
    cors({
      origin: (origin, callback) => {
        if (!origin || env.allowAllOrigins || env.frontendUrls.includes(origin)) {
          callback(null, true);
          return;
        }
        callback(null, false);
      },
      credentials: true
    })
  );
  app.use(compression());
  app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 300 }));
  app.use(express.json({ limit: "1mb" }));
  app.use(express.urlencoded({ extended: true }));
  app.use(mongoSanitize());
  app.use(xss());
  app.use("/uploads", express.static(path.resolve("uploads")));

  app.get("/", (_req, res) =>
    res.json({
      success: true,
      message: "Dynamic PDF Template Management System API",
      routes: {
        health: "/api/health",
        docs: "/api/docs",
        templates: "/api/templates",
        frontend: env.frontendUrl
      }
    })
  );
  app.get("/api/health", (_req, res) => res.json({ success: true, message: "API healthy" }));
  app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.use("/api/templates", templateRoutes);
  app.use("/api/pdf", pdfRoutes);
  app.use("/api/upload", uploadRoutes);

  app.use(notFound);
  app.use(errorHandler);

  return app;
};
