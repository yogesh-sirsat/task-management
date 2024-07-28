import { Request, Response, NextFunction } from "express";
import HttpError from "../utils/httpError";

export function errorHandler(
  err: Error | HttpError,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  console.error(err); // Log the error for debugging purposes

  if (err instanceof HttpError) {
    res.status(err.status).json({ message: err.message });
  } else {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
