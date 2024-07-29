import { CirclePlus } from "lucide-react";

interface CreateTaskButtonProps {
  classNames?: string;
  text?: string;
}

export default function CreateTaskButton({
  classNames = "",
  text = "Create new task",
}: CreateTaskButtonProps) {
  return (
    <button
      className={
        "flex gap-2 items-center justify-center bg-gradient-to-b from-[#4B36CC] to-[#2F2188] font-medium text-white rounded-lg " +
        classNames
      }
    >
      <h3>{text}</h3>
      <CirclePlus fill="white" color="#2F2188" />
    </button>
  );
}
