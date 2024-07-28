import { CirclePlus } from "lucide-react";

export default function CreateTaskButton() {
  return (
    <button className="flex gap-2 items-center justify-center bg-gradient-to-b from-[#4B36CC] to-[#2F2188] p-2 mt-2 2xl:mt-4 text-xl font-medium text-white rounded-lg">
      <div>Create new task</div>
      <CirclePlus fill="white" color="#2F2188" />
    </button>
  );
}
