import { createSlice } from "@reduxjs/toolkit";
import { Task } from "@/interfaces/task.interface";

interface taskState {
  tasks: Task[];
}

const initialState: taskState = {
  tasks: [],
};

export const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    setTasks: (state, action) => {
      state.tasks = action.payload;
    },
  },
});

export const { setTasks } = taskSlice.actions;

export default taskSlice.reducer;
