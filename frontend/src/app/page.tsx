import Image from "next/image";
import Sidebar from "../components/sidebar/Sidebar";
import { HelpCircle } from "lucide-react";
import FeatureAds from "@/components/FeatureAds";
import TaskBoard from "@/components/taskboard/TaskBoard";

export default function Home() {
  return (
    <main className="pr-8 h-screen w-screen flex gap-4 bg-[#F7F7F7]">
      <Sidebar />
      <section className="flex flex-col grow gap-4 text-neutral-500">
        <header className="flex justify-between mt-6 text-black">
          <h1 className="text-4xl 2xl:text-5xl font-semibold">
            Good morning, Joe!
          </h1>
          <div className="flex gap-2">
            <h4 className="font-medium">Help & feedback</h4>
            <HelpCircle />
          </div>
        </header>
        <FeatureAds />
        <TaskBoard />
      </section>
    </main>
  );
}
