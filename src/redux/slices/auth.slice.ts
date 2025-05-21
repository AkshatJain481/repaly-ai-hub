
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  token: string | null;
  userId: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  token: localStorage.getItem("user-token"),
  userId: localStorage.getItem("userId") || null,
  isAuthenticated: !!localStorage.getItem("user-token"),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{ token: string; userId?: string }>) => {
      const { token, userId } = action.payload;
      state.token = token;
      state.isAuthenticated = true;
      if (userId) {
        state.userId = userId;
      }
      localStorage.setItem("user-token", token);
      if (userId) {
        localStorage.setItem("userId", userId);
      }
    },
    logout: (state) => {
      state.token = null;
      state.userId = null;
      state.isAuthenticated = false;
      localStorage.removeItem("user-token");
      localStorage.removeItem("userId");
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
