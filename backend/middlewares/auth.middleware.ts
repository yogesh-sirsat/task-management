import { Request, Response, NextFunction } from "express";

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.session.user?._id) {
      next();
    } else {
      res.status(401).json({ message: "Not authenticated" });
    }
  } catch (err) {
    next(err);
  }
};
