import { Calendar, Filter, Search, Share2, Sparkles } from "lucide-react";
import CreateTaskButton from "../ui/CreateTaskButton";

const menuOptions = [
  { text: "Calendar view", icon: <Calendar /> },
  { text: "Automation", icon: <Sparkles /> },
  { text: "Filter", icon: <Filter /> },
  { text: "Share", icon: <Share2 /> },
];

export default function TaskBoardMenu() {
  return (
    <section className="flex justify-between items-center">
      <div className="rounded-lg flex items-center">
        <input
          type="search"
          className="w-48 p-2 rounded-lg border border-r-0 rounded-r-none"
          placeholder="Search..."
        />
        <button className="bg-white p-2 border border-l-0 rounded-lg rounded-l-none">
          <Search />
        </button>
      </div>
      <div className="flex gap-4 items-center">
        <ul className="flex gap-4">
          {menuOptions.map((option, index) => (
            <li key={index}>
              <button className="flex hover:bg-[#e6e6e6] bg-[#F3F3F3] rounded-md p-2 gap-3 items-center">
                <h3>{option.text}</h3>
                {option.icon}
              </button>
            </li>
          ))}
        </ul>
        <CreateTaskButton classNames="p-2" text="Create task" />
      </div>
    </section>
  );
}
