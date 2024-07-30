"use client";
import { CirclePlus } from "lucide-react";
import { useAppDispatch } from "@/store/hooks";
import { setIsTaskModalOpen } from "@/store/features/appSlice";

interface CreateTaskButtonProps {
  classNames?: string;
  text?: string;
}

export default function CreateTaskButton({
  classNames = "",
  text = "Create new task",
}: CreateTaskButtonProps) {
  const dispatch = useAppDispatch();
  return (
    <button
      className={
        "flex gap-2 items-center justify-center bg-gradient-to-b from-[#4B36CC] to-[#2F2188] font-medium text-white rounded-lg " +
        classNames
      }
      onClick={() => {
        dispatch(setIsTaskModalOpen(true));
      }}
    >
      <h3>{text}</h3>
      <CirclePlus fill="white" color="#2F2188" />
    </button>
  );
}
