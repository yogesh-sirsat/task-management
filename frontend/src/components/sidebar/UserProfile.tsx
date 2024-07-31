"use client";
import { BellDot, ChevronsRight, Loader } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { RootState } from "@/store/store";
import { logout } from "@/store/features/userSlice";

export default function UserProfile() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state: RootState) => state.user.user);
  return (
    <>
      <div className="flex gap-2 text-xl font-medium text-zinc-950">
        <img
          loading="lazy"
          src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
          className="shrink-0 rounded-lg aspect-square w-[2rem]"
          alt="User avatar"
        />
        <div className="my-auto">{user?.fullName}</div>
      </div>
      <div className="flex gap-0.5 justify-between mt-2 w-full">
        <div className="flex gap-5 my-auto text-neutral-500">
          <BellDot />
          <div className="relative">
            <Loader />
            <div className="absolute top-0.5 right-0.5 w-2 h-2 rounded-full bg-yellow-500"></div>
          </div>
          <ChevronsRight />
        </div>
        <button
          className="p-2 text-base rounded hover:bg-zinc-200 bg-zinc-100 text-neutral-500"
          onClick={() => dispatch(logout())}
        >
          Logout
        </button>
      </div>
    </>
  );
}
