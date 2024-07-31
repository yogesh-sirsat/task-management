"use client";
import TaskBoardMenu from "./TaskBoardMenu";
import TaskColumn from "./TaskColumn";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { RootState } from "@/store/store";
import { setTasks } from "@/store/features/taskSlice";
import { useEffect, useState } from "react";
import { TaskStatus } from "@/interfaces/task.interface";

const columns: {
  status: TaskStatus;
}[] = [
  { status: "To-Do" },
  { status: "In Progress" },
  { status: "Under Review" },
  { status: "Completed" },
];

export default function TaskBoard() {
  const dispatch = useAppDispatch();
  const tasks = useAppSelector((state: RootState) => state.task.tasks);
  const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL;
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = async () => {
    setError(null);
    try {
      const response = await fetch(`${backendURL}/tasks`, {
        method: "GET",
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Failed to fetch tasks");
      }
      const data = await response.json();
      dispatch(setTasks(data));
    } catch (error) {
      console.error("Error fetching tasks:", error);
      setError("Oops! Error while getting your tasks");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [dispatch]);

  return (
    <section className="flex flex-col gap-4">
      <TaskBoardMenu />
      {error ? (
        <div className="bg-red-500 text-white p-2">{error}</div>
      ) : (
        <section className="flex justify-between grow gap-4 p-4 rounded-lg bg-white w-full h-full">
          {columns.map((column, index) => (
            <TaskColumn
              key={index}
              status={column.status}
              tasks={tasks.filter((task) => task.status === column.status)}
            />
          ))}
        </section>
      )}
    </section>
  );
}
