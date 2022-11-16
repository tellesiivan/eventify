import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// types
type User = {
  email: string;
  userName: string;
};

type AuthState = {
  user: User;
  isAuthLoading: boolean;
};

const initialState: AuthState = {
  user: {
    email: "",
    userName: "",
  },
  isAuthLoading: false,
};

export const authSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    addAuthUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    authIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isAuthLoading = action.payload;
    },
  },
});

export const { addAuthUser, authIsLoading } = authSlice.actions;

export default authSlice.reducer;
