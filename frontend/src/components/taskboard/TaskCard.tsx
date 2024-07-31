"use client";
import { Task } from "@/interfaces/task.interface";
import { Trash2, Clock3, Edit } from "lucide-react";
import { useAppDispatch } from "@/store/hooks";
import { setIsTaskModalOpen } from "@/store/features/appSlice";
import { deleteTask, setTaskModalData } from "@/store/features/taskSlice";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useState } from "react";

function PriorityBadge({ priority }: { priority: string }) {
  let backgroundColor;
  switch (priority) {
    case "Urgent":
      backgroundColor = "bg-[#FF6B6B]";
      break;
    case "Medium":
      backgroundColor = "bg-[#FFA235]";
      break;
    case "Low":
      backgroundColor = "bg-[#0ECC5A]";
      break;
    default:
      break;
  }

  return (
    <div
      className={
        backgroundColor + " text-white text-xs px-2 py-1.5 rounded-lg w-fit"
      }
    >
      {priority}
    </div>
  );
}

interface TaskCardProps {
  task: Task;
}

export default function TaskCard({ task }: TaskCardProps) {
  const [error, setError] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  dayjs.extend(relativeTime);

  const onEdit = () => {
    dispatch(setTaskModalData(task));
    dispatch(setIsTaskModalOpen(true));
  };

  const onDelete = async () => {
    setError(null);
    try {
      const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL;
      const resposne = await fetch(`${backendURL}/tasks/${task._id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!resposne.ok) {
        throw new Error("Failed to delete task");
      }
      dispatch(deleteTask(task._id));
    } catch (error: any) {
      setError(error.message);
      console.error("Error deleting task:", error);
    }
  };

  const getTimeFromMongoId = (_id: string) => {
    const timestampHex: string = _id.substring(0, 8);
    const timestamp: number = parseInt(timestampHex, 16) * 1000;
    return dayjs(timestamp).fromNow();
  };

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData("taskId", task?._id as string);
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      className="cursor-grab active:cursor-grabbing flex flex-col gap-3 p-4 rounded-lg bg-[#F9F9F9] border border-[#DEDEDE]"
    >
      <div className="flex justify-between">
        {error ? (
          <div className="bg-red-500 text-white p-2">{error}</div>
        ) : null}
        <h3 className="font-semibold">{task.title}</h3>
        <div className="flex gap-1.5">
          <Edit size={20} className="cursor-pointer" onClick={onEdit} />
          <Trash2
            size={20}
            color="red"
            className="cursor-pointer"
            onClick={onDelete}
          />
        </div>
      </div>
      {task?.description ? (
        <p className="text-sm">{task?.description}</p>
      ) : null}
      {task?.priority ? <PriorityBadge priority={task.priority} /> : null}
      {task?.deadline ? (
        <div className="flex gap-2">
          <Clock3 /> {dayjs(task.deadline).format("YYYY-MM-DD")}
        </div>
      ) : null}
      <p className="pt-1">{getTimeFromMongoId(task._id)}</p>
    </div>
  );
}
