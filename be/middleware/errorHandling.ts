import { Request, Response, NextFunction } from "express";

export function catchAsyncErrors() {
  process.on('unhandledRejection', (reason: any, promise: any) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
    // Attach a custom error object to the promise
    promise.customError = {
      status: 500,
      message: 'Internal Server Error',
      reason,
    };
  });
}

export default function errorHandlingMiddleware(
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
){
  // TODO: this is a good place to log the error to a file or database or some other logging service like Sentry
  console.log('Error in error-handling middleware:', error);
  try {
    if (error.customError) {
      // Handle the custom error here
      const { status, message, reason } = error.customError;
      res.status(status).json({ error: message, reason });
    } else {
      // Log and handle other errors
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } catch (err) {
    console.error('Error in error-handling middleware:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
