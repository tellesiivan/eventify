import { ManageUserNavigationTabItems } from "@simplimods/types";

export interface ManageUserScreen {
  activeNavigationTab: ManageUserNavigationTabItems;
  isMobile: boolean;
  isMobileNavModalOpen: boolean;
}

export interface UserInterface {
  manageUser: ManageUserScreen;
}
