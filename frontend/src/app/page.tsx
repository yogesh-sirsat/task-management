"use client";
import Sidebar from "../components/sidebar/Sidebar";
import { HelpCircle } from "lucide-react";
import FeatureAds from "@/components/FeatureAds";
import TaskBoard from "@/components/taskboard/TaskBoard";
import TaskModal from "@/components/taskboard/TaskModal";
import SessionWrapper from "./SessionWrapper";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

function Home() {
  const user = useAppSelector((state) => state.user.user);
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) {
      return "Good morning";
    } else if (hour < 18) {
      return "Good afternoon";
    } else {
      return "Good evening";
    }
  };
  return (
    <SessionWrapper>
      <main className="h-screen flex gap-4 bg-[#F7F7F7] relative">
        <Sidebar />
        <section className="flex flex-col grow gap-4 text-neutral-500 overflow-auto pr-8">
          <header className="flex justify-between mt-6 text-black">
            <h1 className="text-4xl 2xl:text-5xl font-semibold">
              {getGreeting()}, {user?.fullName?.split(" ")[0]}!
            </h1>
            <div className="flex gap-2">
              <h4 className="font-medium">Help & feedback</h4>
              <HelpCircle />
            </div>
          </header>
          <FeatureAds />
          <TaskBoard />
          <TaskModal />
        </section>
      </main>
    </SessionWrapper>
  );
}

export default Home;
