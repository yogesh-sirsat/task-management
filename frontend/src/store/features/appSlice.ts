import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedNavMenu: "Home",
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setSelectedNavMenu: (state, action) => {
      state.selectedNavMenu = action.payload;
    },
  },
});

export const { setSelectedNavMenu } = appSlice.actions;

export default appSlice.reducer;
