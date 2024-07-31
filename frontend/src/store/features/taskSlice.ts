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
    addTask: (state, action) => {
      state.tasks.push(action.payload);
    },
    updateTask: (state, action) => {
      const index = state.tasks.findIndex(
        (task) => task._id === action.payload._id
      );
      if (index !== -1) {
        state.tasks[index] = action.payload;
      }
    },
    moveTask: (state, action) => {
      const index = state.tasks.findIndex(
        (task) => task._id === action.payload.taskId
      );
      if (index !== -1) {
        state.tasks[index].status = action.payload.status;
      }
    },
    deleteTask: (state, action) => {
      const index = state.tasks.findIndex(
        (task) => task._id === action.payload
      );
      if (index !== -1) {
        state.tasks.splice(index, 1);
      }
    },
    setTaskModalData: (state, action) => {
      state.taskModalData = action.payload;
    },
  },
});

export const {
  setTasks,
  addTask,
  updateTask,
  moveTask,
  deleteTask,
  setTaskModalData,
} = taskSlice.actions;

export default taskSlice.reducer;
