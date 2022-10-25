import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// types
type User = {
  email: string;
  userName: string;
};

type AuthState = {
  user: User;
};

const initialState: AuthState = {
  user: {
    email: "",
    userName: "",
  },
};

export const authSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    addAuthUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
  },
});

export const { addAuthUser } = authSlice.actions;

export default authSlice.reducer;
