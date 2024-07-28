"use client";
import {
  ChartLine,
  House,
  SquareKanban,
  Settings,
  UsersRound,
} from "lucide-react";
import { useState } from "react";

export default function NavMenu() {
  const [selected, setSelected] = useState("Home");
  const menuItems = [
    {
      icon: <House />,
      text: "Home",
    },
    {
      icon: <SquareKanban />,
      text: "Boards",
    },
    {
      icon: <Settings />,
      text: "Settings",
    },
    {
      icon: <UsersRound />,
      text: "Teams",
    },
    {
      icon: <ChartLine />,
      text: "Analytics",
    },
  ];

  return (
    <nav className="mt-4">
      {menuItems.map((item, index) => (
        <button
          key={index}
          className={`flex items-center pl-2 py-1 gap-2 text-lg text-neutral-500 w-full ${
            selected === item.text
              ? "rounded border border-solid bg-zinc-100 border-zinc-300"
              : "hover:bg-zinc-100"
          }`}
          onClick={() => setSelected(item.text)}
        >
          {item.icon}
          <div>{item.text}</div>
        </button>
      ))}
    </nav>
  );
}
