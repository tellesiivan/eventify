import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../store";
import {authApi} from "@simplimods/redux";

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
  name: "auth",
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
    builder.addMatcher(
      authApi.endpoints.getUser.matchFulfilled,
      (state, action) => {
        const getUserSettings = async () => {};
        state.user.email = action.payload.email;
      }
    );
  },
});

export const { addAuthUser, authIsLoading, resetAuthState } = authSlice.actions;

// selectors =
export const selectCurrentAuthUser = (state: RootState) => state.auth.user;
export const selectCurrentAuthUsername = (state: RootState) =>
  state.auth.user.userName;

export default authSlice.reducer;
