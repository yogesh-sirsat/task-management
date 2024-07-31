import { ArrowUpNarrowWide } from "lucide-react";
import TaskCard from "./TaskCard";
import { Task, TaskStatus } from "@/interfaces/task.interface";
import CreateStatusTaskButton from "../ui/CreateStatusTaskButton";
import { useAppDispatch } from "@/store/hooks";
import { moveTask } from "@/store/features/taskSlice";
import { useState } from "react";

interface TaskColumnProps {
  status: TaskStatus;
  tasks: Task[];
}

export default function TaskColumn({ status, tasks }: TaskColumnProps) {
  const dispatch = useAppDispatch();
  const [error, setError] = useState<string | null>(null);
  const handleOnDrop = async (
    e: React.DragEvent<HTMLDivElement>,
    status: TaskStatus
  ) => {
    e.preventDefault();
    try {
      const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL;
      const taskId = e.dataTransfer.getData("taskId");
      const response = await fetch(`${backendURL}/tasks/${taskId}`, {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });
      if (!response.ok) {
        throw new Error("Failed to move task");
      }
      dispatch(moveTask({ taskId, status }));
    } catch (error) {
      setError("Oops! Error while moving your tasks");
      console.error("Error dropping task:", error);
    }
  };
  return (
    <div
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => handleOnDrop(e, status)}
      className="flex flex-col w-full gap-4"
    >
      <div className="flex items-center justify-between">
        <h2>{status}</h2>
        <ArrowUpNarrowWide />
      </div>
      <ul className="flex flex-col gap-2">
        {tasks.map((task, index) => (
          <li key={index}>
            <TaskCard task={task} />
          </li>
        ))}
      </ul>
      <CreateStatusTaskButton taskStatus={status} />
    </div>
  );
}
