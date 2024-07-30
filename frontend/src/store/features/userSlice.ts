import { User } from "@/interfaces/user.interface";
import { createSlice } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "../store";

interface userState {
  user: User | null;
  isAuthenticated: boolean;
}

const initialState: userState = {
  user: null,
  isAuthenticated: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setIsAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },
    login: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setUser, setIsAuthenticated, login, logout } = userSlice.actions;

export const checkSession = (): AppThunk => async (dispatch) => {
  try {
    const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL;
    const response = await fetch(`${backendURL}/check-session`, {
      method: "GET",
      credentials: "include",
    });
    if (response.ok) {
      dispatch(setIsAuthenticated(true));
    } else {
      dispatch(setIsAuthenticated(false));
    }
  } catch (error) {
    console.error("Error checking session:", error);
    dispatch(setIsAuthenticated(false));
  }
};

export default userSlice.reducer;
