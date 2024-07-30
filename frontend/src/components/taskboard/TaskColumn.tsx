import { ArrowUpNarrowWide } from "lucide-react";
import TaskCard from "./TaskCard";
import { Task, TaskStatus } from "@/interfaces/task.interface";
import CreateStatusTaskButton from "../ui/CreateStatusTaskButton";

interface TaskColumnProps {
  status: TaskStatus;
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
      <CreateStatusTaskButton taskStatus={status} />
    </div>
  );
}
