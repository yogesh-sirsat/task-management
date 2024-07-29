import { ArrowUpNarrowWide, Plus } from "lucide-react";
import TaskCard from "./TaskCard";
import { Task } from "@/interfaces/task.interface";

interface TaskColumnProps {
  status: string;
  tasks: Task[];
}

export default function TaskColumn({ status, tasks }: TaskColumnProps) {
  return (
    <div className="flex flex-col w-full gap-4">
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
      <button className="w-full p-2 rounded-md bg-gradient-to-b from-[#3A3A3A] to-[#202020] flex justify-between items-center ">
        <h3 className="text-[#E3E1E1] text-base">Add new</h3>
        <Plus strokeWidth={1.5} size={24} color="#E3E1E1" />
      </button>
    </div>
  );
}
