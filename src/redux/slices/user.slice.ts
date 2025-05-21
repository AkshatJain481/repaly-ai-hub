import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PlatformAccount, UserProfile } from "@/utils/interfaces";

interface AuthState {
  token: string | null;
  userAccounts: PlatformAccount[];
  activeAccount: PlatformAccount | null;
  userProfile: UserProfile | null;
}

const initialState: AuthState = {
  userProfile: null,
  token: localStorage.getItem("user-token"),
  userAccounts: [],
  activeAccount: null,
};

const userSlice = createSlice({
  name: "User",
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      state.userAccounts = [];
      state.activeAccount = null;
      state.userProfile = null;
      window.location.href = "/";
      localStorage.clear();
    },
    setActiveAccount: (
      state,
      action: PayloadAction<PlatformAccount | null>
    ) => {
      state.activeAccount = action.payload;
      if (action.payload) {
        localStorage.setItem("activeAccount", JSON.stringify(action.payload));
      }
    },
    setUserProfile: (state, action: PayloadAction<UserProfile | null>) => {
      state.userProfile = action.payload;
    },
    setUserAccounts: (state, action: PayloadAction<PlatformAccount[]>) => {
      state.userAccounts = action.payload;
    },
    setToken: (state, action: PayloadAction<string | null>) => {
      state.token = action.payload;
      if (action.payload) {
        localStorage.setItem("user-token", action.payload);
      } else {
        localStorage.removeItem("user-token");
      }
    },
  },
});

export const {
  logout,
  setActiveAccount,
  setUserAccounts,
  setUserProfile,
  setToken,
} = userSlice.actions;
export default userSlice.reducer;
