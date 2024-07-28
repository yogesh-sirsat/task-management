import UserProfile from "./UserProfile";
import NavMenu from "./NavMenu";
import CreateTaskButton from "./CreateTaskButton";
import DownloadAppButton from "./DownloadAppButton";

export default function Sidebar() {
  return (
    <aside className="flex flex-col w-[21vw] 2xl:w-[17vw]">
      <div className="flex flex-col grow px-4 pt-4 2xl:pt-6 w-full bg-white border-r border-neutral-200 relative">
        <UserProfile />
        <NavMenu />
        <CreateTaskButton />
        <DownloadAppButton />
      </div>
    </aside>
  );
}
