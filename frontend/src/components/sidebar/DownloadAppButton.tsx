import { ArrowDownToLine } from "lucide-react";

export default function DownloadAppButton() {
  return (
    <div className="flex items-center cursor-pointer gap-2 2xl:gap-4 p-2 pl-3 2xl:pl-4 rounded-lg bg-zinc-100 text-stone-500 absolute bottom-4 inset-x-4">
      <ArrowDownToLine />
      <div className="flex flex-col">
        <div className="text-xl font-medium">Download the app</div>
        <div className="mt-1 text-sm">Get the full experience</div>
      </div>
    </div>
  );
}
