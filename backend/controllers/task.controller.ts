import { Request, Response, NextFunction } from "express";
import { ObjectId } from "mongodb";
import { Task } from "../models/task.model";
import {
  getAllTasksData,
  createTaskData,
  updateTaskData,
  deleteTaskData,
} from "../services/task.service";
import HttpError from "../utils/httpError";

export async function getAllTasks(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Task[] | void> {
  try {
    const userId = req.session.user?._id;
    if (!userId) {
      throw new HttpError(401, "User not authenticated");
    }
    const tasks = await getAllTasksData(userId);
    res.status(200).json(tasks);
  } catch (err) {
    next(err);
  }
}

export async function createTask(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Task | void> {
  try {
    const userId = req.session.user?._id;
    if (!userId) {
      throw new HttpError(401, "User not authenticated");
    }
    const newTask: Omit<Task, "_id"> = {
      ...req.body,
      user: userId,
    };
    const task = await createTaskData(newTask);
    res.status(201).json(task);
  } catch (err) {
    next(err);
  }
}

export async function updateTask(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { taskId } = req.params;
    const task = await updateTaskData(new ObjectId(taskId), req.body);
    res.status(200).json(task);
  } catch (err) {
    next(err);
  }
}

export async function deleteTask(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { taskId } = req.params;
    await deleteTaskData(new ObjectId(taskId));
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}
