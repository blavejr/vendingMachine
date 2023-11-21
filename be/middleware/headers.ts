import { NextFunction, Request, Response } from "express";

export const acceptOnlyJson = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const contentType = req.get("Content-Type");
  
    if (contentType !== "application/json") {
      return res.status(400).json({
        message: "Server accepts only application/json data"
      });
    }
  
    next();
  };