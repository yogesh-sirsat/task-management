import { Request, Response, NextFunction } from "express";
import { createUserData, getUserData } from "../services/user.service";
import HttpError from "../utils/httpError";
import { User } from "../models/user.model";
import bcrypt from "bcrypt";
import { sanitizeUser } from "../utils/sanitize";

export async function createUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userBody: User = req.body;
    const userExists = await getUserData(userBody.email);
    if (userExists) {
      throw new HttpError(409, "User already exists");
    }
    userBody.password = await bcrypt.hash(userBody.password, 10);
    const user = await createUserData(userBody);
    res.status(201).json(sanitizeUser(user));
  } catch (err) {
    next(err);
  }
}

export async function loginUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { email, password } = req.body;
    const userExists = await getUserData(email);
    if (!userExists) {
      throw new HttpError(401, "User not found");
    }
    const isPasswordValid = await bcrypt.compare(password, userExists.password);
    if (!isPasswordValid) {
      throw new HttpError(401, "Invalid password");
    }
    const user = await getUserData(req.body.email);
    res.status(200).json(sanitizeUser(user));
  } catch (err) {
    next(err);
  }
}
