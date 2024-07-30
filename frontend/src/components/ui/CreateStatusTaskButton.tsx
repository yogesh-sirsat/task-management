"use client";
import { Plus } from "lucide-react";
import { useAppDispatch } from "@/store/hooks";
import { setIsTaskModalOpen } from "@/store/features/appSlice";
import { setTaskModalData } from "@/store/features/taskSlice";
import { TaskStatus } from "@/interfaces/task.interface";

interface CreateStatusTaskButtonProps {
  taskStatus: TaskStatus;
}

export default function CreateStatusTaskButton({
  taskStatus,
}: CreateStatusTaskButtonProps) {
  const dispatch = useAppDispatch();
  return (
    <button
      className="w-full p-2 rounded-md bg-gradient-to-b from-[#3A3A3A] to-[#202020] flex justify-between items-center"
      onClick={() => {
        dispatch(setTaskModalData({ status: taskStatus }));
        dispatch(setIsTaskModalOpen(true));
      }}
    >
      <h3 className="text-[#E3E1E1] text-base">Add new</h3>
      <Plus strokeWidth={1.5} size={24} color="#E3E1E1" />
    </button>
  );
}
