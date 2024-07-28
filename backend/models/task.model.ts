import { ObjectId } from "mongodb";

export interface Task {
  _id?: ObjectId;
  user: ObjectId;
  title: string;
  description?: string;
  status: "To-Do" | "In Progress" | "Under Review" | "Completed";
  priority?: "Low" | "Medium" | "Urgent";
  deadline?: Date;
}
