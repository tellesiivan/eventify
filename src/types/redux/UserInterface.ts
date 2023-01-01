import { ManageUserNavigationTabItems } from "@simplimods/types";

export interface ManageUserScreen {
  activeNavigationTab: ManageUserNavigationTabItems;
  isMobile: boolean;
  isMobileNavDrawerOpen: boolean;
}

export interface UserInterface {
  manageUser: ManageUserScreen;
}
