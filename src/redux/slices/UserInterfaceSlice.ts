import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ManageUserNavigationTabItems, UserInterface } from "@simplimods/types";
import { RootState } from "../store";

// types
const initialState: UserInterface = {
  manageUser: {
    activeNavigationTab: "Profile",
    isMobile: false,
    isMobileNavModalOpen: false,
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
    setManageUserIsMobileModalOpen: (state, action: PayloadAction<boolean>) => {
      state.manageUser.isMobileNavModalOpen = action.payload;
    },
  },
  extraReducers(builder) {
    // builder.addMatcher();
  },
});

export const {
  setManageUserIsMobile,
  setManageUserIsMobileModalOpen,
  updateActiveManageUserNavigationTab,
} = userInterfaceSlice.actions;

// selectors = /** ===== Manage user screen =====  */
export const ManageUserIsMobile = (state: RootState) =>
  state.userInterface.manageUser.isMobile;
export const ManageUserIsMobileModalOpen = (state: RootState) =>
  state.userInterface.manageUser.isMobileNavModalOpen;
export const ManageUserActiveNavigationTab = (state: RootState) =>
  state.userInterface.manageUser.activeNavigationTab;

export default userInterfaceSlice.reducer;
