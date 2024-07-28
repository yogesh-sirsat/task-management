import { ObjectId } from "mongodb";
import { connectToMongoDB } from "../database/mongo.database";

export interface User {
  _id: ObjectId;
  fullName: string;
  email: string;
  password: string;
}

