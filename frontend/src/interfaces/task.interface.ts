export type TaskStatus = "To-Do" | "In Progress" | "Under Review" | "Completed";

export interface Task {
  _id: string;
  user: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority?: "Low" | "Medium" | "Urgent";
  deadline?: string;
}

export interface TaskForm extends Omit<Task, "_id" | "user"> {}
