import { Request, Response, NextFunction } from "express";
import { UnauthorizedError } from "express-jwt";
import { ValidationError } from "yup";
import * as statusCodes from "../validation/statusCodes";
import messagesSchema from "../validation/messages.schema";

export default function errorHandlingMiddleware(
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  switch (true) {
    // Yup validation errors
    case error instanceof ValidationError:
      res
        .status(statusCodes.BAD_REQUEST)
        .json({ error: "Validation Error", details: error.errors });
      break;

    // JWT authentication error
    case error instanceof UnauthorizedError:
      res
        .status(statusCodes.UNAUTHORIZED)
        .json({ error: "Unauthorized Error", message: error.message });
      break;

    // Specific error handling
    // TODO: Add an error class to format these better thab relying on the message
    case error instanceof Error && error.message === "User not found":
      res.status(statusCodes.NOT_FOUND).json({ error: "User not found" });
      break;

    case error instanceof Error && error.message === "User not a buyer":
      res.status(statusCodes.NOT_FOUND).json({ error: "User not a buyer" });
      break;
    case error instanceof Error && error.message === "Product not found":
      res.status(statusCodes.NOT_FOUND).json({ error: "Product not found" });
      break;

    // Generic error handling
    default:
      console.error(error);
      res
        .status(messagesSchema.internalServerError.code)
        .json({ error: messagesSchema.internalServerError.message });
      break;
  }
}
