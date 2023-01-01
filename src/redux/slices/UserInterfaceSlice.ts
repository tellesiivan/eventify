import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ManageUserNavigationTabItems, UserInterface} from "@simplimods/types";
import {RootState} from "../store";

// types
const initialState: UserInterface = {
  manageUser: {
    activeNavigationTab: "Profile",
    isMobile: false,
    isMobileNavDrawerOpen: false,
  },
};

export const userInterfaceSlice = createSlice({
  name: "userInterface",
  initialState,
  reducers: {
    /** ===== Manage user screen =====  */
    updateActiveManageUserNavigationTab: (
      state,
      action: PayloadAction<ManageUserNavigationTabItems>
    ) => {
      state.manageUser.activeNavigationTab = action.payload;
    },
    setManageUserIsMobile: (state, action: PayloadAction<boolean>) => {
      state.manageUser.isMobile = action.payload;
    },
    setManageUserIsMobileDrawerOpen: (
      state,
      action: PayloadAction<boolean>
    ) => {
      state.manageUser.isMobileNavDrawerOpen = action.payload;
    },
  },
  extraReducers(builder) {
    // builder.addMatcher();
  },
});

export const {
  setManageUserIsMobile,
  setManageUserIsMobileDrawerOpen,
  updateActiveManageUserNavigationTab,
} = userInterfaceSlice.actions;

// selectors = /** ===== Manage user screen =====  */
export const ManageUserIsMobile = (state: RootState) =>
  state.userInterface.manageUser.isMobile;
export const ManageUserIsMobileDrawerOpen = (state: RootState) =>
  state.userInterface.manageUser.isMobileNavDrawerOpen;
export const ManageUserActiveNavigationTab = (state: RootState) =>
  state.userInterface.manageUser.activeNavigationTab;

export default userInterfaceSlice.reducer;
