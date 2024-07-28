import { Request, Response, NextFunction } from "express";
import { ObjectId } from "mongodb";
import { Task } from "../models/task.model";
import {
  getAllTasksData,
  createTaskData,
  updateTaskData,
  deleteTaskData,
} from "../services/task.service";

export async function getAllTasks(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Task[] | void> {
  try {
    const tasks = await getAllTasksData();
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
    const task = await createTaskData(req.body);
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
