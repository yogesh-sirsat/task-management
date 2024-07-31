import { connectToMongoDB } from "../database/mongo.database";
import { Task } from "../models/task.model";
import { ObjectId } from "mongodb";
import HttpError from "../utils/httpError";

export async function getAllTasksData(
  userId: ObjectId | string
): Promise<Task[]> {
  const { db } = await connectToMongoDB();
  const tasks = await db
    .collection<Task>("tasks")
    .find({ user: userId })
    .toArray();
  return tasks;
}

export async function createTaskData(
  task: Omit<Task, "_id">
): Promise<Task | null> {
  const { db } = await connectToMongoDB();
  const result = await db
    .collection<Omit<Task, "_id">>("tasks")
    .insertOne(task);
  const createdTask = await db.collection<Task>("tasks").findOne({
    _id: result.insertedId,
  });
  return createdTask;
}

export async function updateTaskData(
  taskId: ObjectId,
  updates: Partial<Task>
): Promise<void> {
  const { db } = await connectToMongoDB();
  const result = await db
    .collection<Task>("tasks")
    .updateOne({ _id: taskId }, { $set: updates });
  if (result.matchedCount === 0) {
    throw new HttpError(404, "Task not found for update");
  }
}

export async function deleteTaskData(taskId: ObjectId): Promise<void> {
  const { db } = await connectToMongoDB();
  const result = await db.collection<Task>("tasks").deleteOne({ _id: taskId });
  if (result.deletedCount === 0) {
    throw new HttpError(404, "Task not found for delete");
  }
}
