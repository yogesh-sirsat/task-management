"use client";
import { Task } from "@/interfaces/task.interface";
import { Trash2, Pencil } from "lucide-react";
import { useAppDispatch } from "@/store/hooks";
import { setIsTaskModalOpen } from "@/store/features/appSlice";
import { setTaskModalData } from "@/store/features/taskSlice";
import dayjs from "dayjs";

interface TaskCardProps {
  task: Task;
}

export default function TaskCard({ task }: TaskCardProps) {
  const dispatch = useAppDispatch();

  function onEdit() {
    dispatch(setTaskModalData(task));
    dispatch(setIsTaskModalOpen(true));
  }

  return (
    <div className="flex flex-col gap-4 p-4 rounded-lg bg-[#F9F9F9] border border-[#DEDEDE]">
      <div className="flex justify-between">
        <h3>{task.title}</h3>
        <div className="flex gap-1.5">
          <Pencil size={20} className="cursor-pointer" onClick={onEdit} />
          <Trash2 size={20} color="red" className="cursor-pointer" />
        </div>
      </div>
      {task?.description ? <h4>Description</h4> : null}
      {task?.priority ? <p>{task.priority}</p> : null}
      {task?.deadline ? (
        <p>{dayjs(task.deadline).format("YYYY-MM-DD")}</p>
      ) : null}
    </div>
  );
}
