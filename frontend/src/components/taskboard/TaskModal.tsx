"use client";
import { Dialog, DialogPanel, DialogBackdrop } from "@headlessui/react";
import {
  Share2,
  Star,
  X,
  Maximize2,
  Loader,
  OctagonAlert,
  Calendar,
  Pencil,
  Plus,
  Save,
} from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { RootState } from "@/store/store";
import { setIsTaskModalOpen } from "@/store/features/appSlice";
import {
  addTask,
  updateTask,
  setTaskModalData,
} from "@/store/features/taskSlice";
import { useEffect, useRef, FormEvent, useState } from "react";

const modalButtons = [
  { text: "Save", icon: <Save size={20} /> },
  {
    text: "Share",
    icon: <Share2 size={20} />,
  },
  {
    text: "Favorite",
    icon: <Star size={20} />,
  },
];

export default function TaskModal() {
  const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL;
  const isTaskModalOpen = useAppSelector(
    (state: RootState) => state.app.isTaskModalOpen
  );
  const taskModalData = useAppSelector(
    (state: RootState) => state.task.taskModalData
  );
  const dispatch = useAppDispatch();

  const [error, setError] = useState<string | null>(null);
  const titleRef = useRef<HTMLTextAreaElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (titleRef.current) {
      titleRef.current.style.height = "auto";
      titleRef.current.style.height = titleRef.current.scrollHeight + "px";
    }
  }, [taskModalData?.title]);

  useEffect(() => {
    if (descriptionRef.current) {
      descriptionRef.current.style.height = "auto";
      descriptionRef.current.style.height =
        descriptionRef.current.scrollHeight + "px";
    }
  }, [taskModalData?.description]);

  function close() {
    dispatch(setIsTaskModalOpen(false));
    dispatch(setTaskModalData(null));
    setError(null);
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    try {
      const url = taskModalData?._id
        ? `${backendURL}/tasks/${taskModalData?._id}`
        : `${backendURL}/tasks`;
      const { _id, ...data }: any = taskModalData;
      const response = await fetch(url, {
        method: taskModalData?._id ? "PUT" : "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to save task");
      }
      if (taskModalData?._id) {
        dispatch(updateTask(taskModalData));
      } else {
        const data = await response.json();
        dispatch(addTask(data));
      }
      close();
    } catch (error) {
      console.error("Error:", error);
      setError("Oops! Error while saving your task.");
    }
  }

  return (
    <Dialog
      open={isTaskModalOpen || false}
      as="div"
      className="relative z-50 focus:outline-none"
      onClose={close}
    >
      <DialogBackdrop className="fixed inset-0 bg-black/30" />
      <div className="fixed inset-0 z-50 w-screen overflow-y-aut">
        <div className="flex min-h-full items-center justify-center  p-4">
          <DialogPanel
            transition
            className="w-full max-w-4xl min-h-[90vh] flex flex-col justify-start gap-6 text-[#E3E1E1] rounded-xl bg-white px-6 py-4 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
          >
            <div className="flex justify-between items-center h-full">
              <div className="flex gap-4">
                <X
                  size={20}
                  color="#797979"
                  className="cursor-pointer"
                  onClick={close}
                />
                <Maximize2 size={20} color="#797979" />
              </div>
              <div className="flex gap-4">
                {modalButtons.map((button, index) => (
                  <button
                    key={index}
                    type={button.text === "Save" ? "submit" : "button"}
                    form={button.text === "Save" ? "task-form" : undefined}
                    className="flex items-center gap-3 p-2 rounded-md text-[#797979] bg-zinc-100 hover:bg-zinc-200"
                  >
                    <h3>{button.text}</h3>
                    {button.icon}
                  </button>
                ))}
              </div>
            </div>
            <form
              className="flex flex-col gap-8"
              id="task-form"
              onSubmit={onSubmit}
            >
              {error && (
                <div className="bg-red-500 text-white p-2">{error}</div>
              )}
              <textarea
                ref={titleRef}
                rows={1}
                required
                className="text-5xl resize-none overflow-hidden font-semibold text-black focus:outline-none w-full"
                placeholder="Title"
                value={taskModalData?.title || ""}
                onChange={(e) => {
                  dispatch(
                    setTaskModalData({
                      ...taskModalData,
                      title: e.target.value,
                    })
                  );
                }}
              />
              <div className="flex gap-4 text-[#666666]">
                <div className="flex items-center gap-6 w-[20%]">
                  <Loader />
                  <h3>Status</h3>
                </div>
                <select
                  value={taskModalData?.status || ""}
                  required
                  className="focus:outline-none text-black w-36"
                  onChange={(e) => {
                    dispatch(
                      setTaskModalData({
                        ...taskModalData,
                        status: e.target.value,
                      })
                    );
                  }}
                >
                  <option value="" disabled>
                    Not selected
                  </option>
                  <option value="To-do">To-Do</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Under Review">Under Review</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
              <div className="flex gap-4 text-[#666666]">
                <div className="flex items-center gap-6 w-[20%]">
                  <OctagonAlert />
                  <h3>Priority</h3>
                </div>
                <select
                  value={taskModalData?.priority || ""}
                  className="focus:outline-none text-black w-36"
                  onChange={(e) => {
                    dispatch(
                      setTaskModalData({
                        ...taskModalData,
                        priority: e.target.value,
                      })
                    );
                  }}
                >
                  <option value="" disabled>
                    Not selected
                  </option>
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="Urgent">Urgent</option>
                </select>
              </div>
              <div className="flex gap-4 text-[#666666]">
                <div className="flex items-center gap-6 w-[20%]">
                  <Calendar />
                  <h3>Deadline</h3>
                </div>
                <input
                  type="date"
                  value={taskModalData?.deadline?.split("T")[0] || ""}
                  className="focus:outline-none text-black"
                  onChange={(e) => {
                    console.log(e.target.value);
                    dispatch(
                      setTaskModalData({
                        ...taskModalData,
                        deadline: e.target.value,
                      })
                    );
                  }}
                />
              </div>
              <div className="flex items-start gap-4 text-[#666666]">
                <div className="flex items-center gap-6 w-[20%]">
                  <Pencil />
                  <h3>Description</h3>
                </div>
                <textarea
                  ref={descriptionRef}
                  rows={1}
                  value={taskModalData?.description}
                  className="focus:outline-none resize-none flex grow text-black"
                  placeholder="Not selected"
                  onChange={(e) => {
                    dispatch(
                      setTaskModalData({
                        ...taskModalData,
                        description: e.target.value,
                      })
                    );
                  }}
                />
              </div>
              <div className="flex gap-4 text-black font-medium">
                <Plus />
                <h3>Add custom property</h3>
              </div>
            </form>
            <hr />
            <p>Start writing, or drag your own files here.</p>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
