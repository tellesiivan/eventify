import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

// types
type User = {
  email: string | null;
  userName: string;
  uid: string | null;
};

type AuthState = {
  user: User;
  isAuthLoading: boolean;
};

const initialState: AuthState = {
  user: {
    email: null,
    userName: "",
    uid: null,
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
    resetAuthState: (state) => {
      state.user = initialState.user;
    },
  },
  extraReducers(builder) {
    builder.addMatcher();
  },
});

export const { addAuthUser, authIsLoading, resetAuthState } = authSlice.actions;

// selectors =
export const selectCurrentAuthUser = (state: RootState) => state.auth.user;

export default authSlice.reducer;
