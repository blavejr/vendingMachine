import { Request, Response, NextFunction } from "express";
import { UnauthorizedError } from "express-jwt";
import { ValidationError } from "yup";
import * as statusCodes from "../validation/statusCodes";

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
      console.log(error);
      res
        .status(statusCodes.UNAUTHORIZED)
        .json({ error: "Unauthorized Error", message: error.message });
      break;

    // Specific error handling
    case error instanceof Error && error.message === "User not found":
      res.status(statusCodes.NOT_FOUND).json({ error: "User not found" });
      break;

    // Generic error handling
    default:
      console.error(error);
      res
        .status(statusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: "Internal Server Error" });
      break;
  }
}
