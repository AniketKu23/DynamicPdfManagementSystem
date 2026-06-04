import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { ApiError } from "../utils/ApiError";
import { env } from "../config/env";

export const notFound = (req: Request, _res: Response, next: NextFunction) => {
  next(new ApiError(404, `Route not found: ${req.method} ${req.originalUrl}`));
};

export const errorHandler = (err: Error, _req: Request, res: Response, _next: NextFunction) => {
  let statusCode = 500;
  let message = "Internal server error";
  let errors: unknown[] = [];

  if (err instanceof ApiError) {
    statusCode = err.statusCode;
    message = err.message;
    errors = err.errors;
  } else if (err instanceof ZodError) {
    statusCode = 400;
    message = "Validation failed";
    errors = err.errors;
  } else if ("name" in err && err.name === "CastError") {
    statusCode = 400;
    message = "Invalid resource id";
  } else if (err.message) {
    message = err.message;
  }

  res.status(statusCode).json({
    success: false,
    message,
    errors,
    stack: env.nodeEnv === "production" ? undefined : err.stack
  });
};
