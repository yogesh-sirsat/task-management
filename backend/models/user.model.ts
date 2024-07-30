import { ObjectId } from "mongodb";

export interface User {
  _id: ObjectId | string;
  fullName: string;
  email: string;
  password: string;
}
