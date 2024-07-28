import Image from "next/image";
import Sidebar from "../components/Sidebar";

export default function Home() {
  return (
    <main className="pr-8 h-screen w-screen flex gap-4 bg-neutral-100">
      <Sidebar />
      <section className=" ">Heloo</section>
    </main>
  );
}
