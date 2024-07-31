import { connectToMongoDB } from "../database/mongo.database";
import { User } from "../models/user.model";
import { sanitizeUser } from "../utils/sanitize";

export async function createUserData(
  user: Omit<User, "_id">
): Promise<User | void> {
  const { db } = await connectToMongoDB();
  const result = await db
    .collection<Omit<User, "_id">>("users")
    .insertOne(user);
  const createdUser = await db
    .collection<User>("users")
    .findOne({ _id: result.insertedId });
  if (!createdUser) {
    throw new Error("Failed to create user");
  }
  return createdUser;
}

export async function getUserData(email: string): Promise<User | null> {
  const { db } = await connectToMongoDB();
  const user = await db.collection<User>("users").findOne({ email });
  return user;
}
