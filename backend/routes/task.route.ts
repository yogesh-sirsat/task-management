import { Router } from "express";
import {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../controllers/task.controller";

const router = Router();

router.get("/", getAllTasks);
router.post("/", createTask);
router.put("/:taskId", updateTask);
router.patch("/:taskId", updateTask);
router.delete("/:taskId", deleteTask);

export default router;
