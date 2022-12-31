import { Icon } from "@simplimods/components";
import {
  AppLayout,
  LayoutType,
  ManageUserSideNavActions,
} from "@simplimods/layout";
import {
  ManageUserActiveNavigationTab,
  selectCurrentAuthUsername,
  updateActiveManageUserNavigationTab,
  useAppDispatch,
  useAppSelector
} from "@simplimods/redux";
import { ManagaeUserScreenContent } from "@simplimods/screens";
import type { ManageUserNavigationTabItems } from "@simplimods/types";
import React from "react";

import { ReactNode } from "react";

export interface NavActionsItem {
  icon: ReactNode;
  name: ManageUserNavigationTabItems;
  onPressAction: () => void;
}

type UserProfileProps = {};

const ManageUserScreen = (props: UserProfileProps) => {
  const username = useAppSelector(selectCurrentAuthUsername);
  const dispatch = useAppDispatch()
  const activeNavItem = useAppSelector(ManageUserActiveNavigationTab)

  const sideNavActions: NavActionsItem[] = [
    {
      icon: <Icon iconName="User" />,
      name: "Profile",
      onPressAction: () => dispatch(updateActiveManageUserNavigationTab('Profile')),
    },
    {
      icon: <Icon iconName="CalendarOutline" />,
      name: "Events",
      onPressAction: () => dispatch(updateActiveManageUserNavigationTab('Events')),
    },
    {
      icon: <Icon iconName="CarOutline" />,
      name: "Vehicles",
      onPressAction: () => dispatch(updateActiveManageUserNavigationTab('Vehicles')),
    },
    {
      icon: <Icon iconName="LinkAddOutline" />,
      name: "Links",
      onPressAction: () => dispatch(updateActiveManageUserNavigationTab('Links')),
    },
  ];

  return (
    <AppLayout
      breadcrumps={[
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
      username={username}
    >
      <ManagaeUserScreenContent
        activeNavItem={activeNavItem}
      />
    </AppLayout>
  );
};

export default ManageUserScreen;
