import { Task } from "@/interfaces/task.interface";

interface TaskCardProps {
  task: Task;
}

export default function TaskCard({ task }: TaskCardProps) {
  return (
    <div className="flex flex-col gap-4 p-4 rounded-lg bg-[#F9F9F9] border border-[#DEDEDE]">
      <h3>{task.title}</h3>
      {task?.description ? <h4>Description</h4> : null}
      {task?.priority ? <p>{task.priority}</p> : null}
      {task?.deadline ? <p>{task.deadline}</p> : null}
    </div>
  );
}
