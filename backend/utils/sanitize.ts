import { User } from "../models/user.model";

export function sanitizeUser(user: any): Omit<User, "password"> {
  const { password, ...sanitizedUser } = user;
  return sanitizedUser;
}
