import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedNavMenu: "Home",
  isTaskModalOpen: false,
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setSelectedNavMenu: (state, action) => {
      state.selectedNavMenu = action.payload;
    },
    setIsTaskModalOpen: (state, action) => {
      state.isTaskModalOpen = action.payload;
    },
  },
});

export const { setSelectedNavMenu, setIsTaskModalOpen } = appSlice.actions;

export default appSlice.reducer;
