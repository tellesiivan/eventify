import { Icon } from "@simplimods/components";
import {
  AppLayout,
  LayoutType,
  ManageUserSideNavActions,
} from "@simplimods/layout";
import {
  ManageUserActiveNavigationTab,
  selectCurrentAuthUser,
  setManageUserIsMobileDrawerOpen,
  updateActiveManageUserNavigationTab,
  useAppDispatch,
  useAppSelector,
} from "@simplimods/redux";
import { ManageUserScreenContent } from "@simplimods/screens";
import type { ManageUserNavigationTabItems } from "@simplimods/types";
import React, { ReactNode } from "react";
import { IsMobileView } from "@simplimods/utils";

export interface NavActionsItem {
  icon: ReactNode;
  name: ManageUserNavigationTabItems;
  onPressAction: () => void;
}

type UserProfileProps = {};

const ManageUserScreen = (props: UserProfileProps) => {
  const isMobile = IsMobileView();
  const currentUser = useAppSelector(selectCurrentAuthUser);
  const dispatch = useAppDispatch();
  const activeNavItem = useAppSelector(ManageUserActiveNavigationTab);

  const updateActiveNavTabHandler = (navItem: ManageUserNavigationTabItems) => {
    if (isMobile) {
      dispatch(setManageUserIsMobileDrawerOpen(false));
    }
    // dispatch and update state with selected item
    dispatch(updateActiveManageUserNavigationTab(navItem));
  };

  const sideNavActions: NavActionsItem[] = [
    {
      icon: <Icon iconName="User" />,
      name: "Profile",
      onPressAction: () => updateActiveNavTabHandler("Profile"),
    },
    {
      icon: <Icon iconName="CalendarOutline" />,
      name: "Events",
      onPressAction: () => updateActiveNavTabHandler("Events"),
    },
    {
      icon: <Icon iconName="CarOutline" />,
      name: "Vehicles",
      onPressAction: () => updateActiveNavTabHandler("Vehicles"),
    },
    {
      icon: <Icon iconName="LinkAddOutline" />,
      name: "Links",
      onPressAction: () => updateActiveNavTabHandler("Links"),
    },
  ];

  return (
    <AppLayout
      breadcrumbs={[
        { label: "Home", link: "/" },
        { label: "Manage", link: "/manage" },
      ]}
      layoutType={LayoutType.Two_ROW}
      leftContent={
        <ManageUserSideNavActions
          sideNavActions={sideNavActions}
          activeNavItem={activeNavItem}
        />
      }
      username={currentUser.userName}
    >
      <ManageUserScreenContent
        activeNavItem={activeNavItem}
        currentUserUid={currentUser.uid ?? ""}
      />
    </AppLayout>
  );
};

export default ManageUserScreen;
