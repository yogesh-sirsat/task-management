"use client";
import {
  ChartLine,
  House,
  SquareKanban,
  Settings,
  UsersRound,
} from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { RootState } from "@/store/store";
import { setSelectedNavMenu } from "@/store/features/appSlice";

export default function NavMenu() {
  const dispatch = useAppDispatch();
  const selectedNavMenu = useAppSelector(
    (state: RootState) => state.app.selectedNavMenu
  );
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
            selectedNavMenu === item.text
              ? "rounded border border-solid bg-zinc-100 border-zinc-300"
              : "hover:bg-zinc-100"
          }`}
          onClick={() => dispatch(setSelectedNavMenu(item.text))}
        >
          {item.icon}
          <div>{item.text}</div>
        </button>
      ))}
    </nav>
  );
}
