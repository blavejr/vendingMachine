import { Request, Response, NextFunction } from "express";
import { ValidationError } from "yup";

export default function errorHandlingMiddleware(
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (error instanceof ValidationError) {
    // Yup validation errors
    res.status(400).json({ error: "Validation Error", details: error.errors });
  } else if (error instanceof Error && error.message === "User not found") {
    // Specific error handling
    res.status(404).json({ error: "User not found" });
  } else {
    // Generic error handling
    res.status(500).json({ error: "Internal Server Error" });
  }
}
