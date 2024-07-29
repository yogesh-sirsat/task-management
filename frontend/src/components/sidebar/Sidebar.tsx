import UserProfile from "./UserProfile";
import NavMenu from "./NavMenu";
import CreateTaskButton from "../ui/CreateTaskButton";
import DownloadAppButton from "./DownloadAppButton";

export default function Sidebar() {
  return (
    <aside className="flex flex-col min-w-[20vw] 2xl:min-w-[15vw]">
      <div className="flex flex-col grow px-4 pt-4 2xl:pt-6 w-full bg-white border-r border-neutral-200 relative">
        <UserProfile />
        <NavMenu />
        <CreateTaskButton
          classNames={"p-2 mt-2 2xl:mt-4 text-xl"}
          text="Create new task"
        />
        <DownloadAppButton />
      </div>
    </aside>
  );
}
