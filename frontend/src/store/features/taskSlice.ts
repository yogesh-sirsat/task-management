import { createSlice } from "@reduxjs/toolkit";
import { Task } from "@/interfaces/task.interface";

interface taskState {
  tasks: Task[];
  taskModalData: Partial<Task> | null;
}

const initialState: taskState = {
  tasks: [],
  taskModalData: null,
};

export const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    setTasks: (state, action) => {
      state.tasks = action.payload;
    },
    setTaskModalData: (state, action) => {
      state.taskModalData = action.payload;
    },
  },
});

export const { setTasks, setTaskModalData } = taskSlice.actions;

export default taskSlice.reducer;
