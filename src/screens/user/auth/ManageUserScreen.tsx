import { Icon } from "@simplimods/components";
import {
  AppLayout,
  LayoutType,
  ManageUserSideNavActions,
} from "@simplimods/layout";
import { useAppSelector } from "@simplimods/redux";
import { ManagaeUserScreenContent } from "@simplimods/screens";
import type { ManageUserNavigationTabItems } from "@simplimods/types";
import React from "react";

import { ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export interface NavActionsItem {
  icon: ReactNode;
  name: ManageUserNavigationTabItems;
  onPressAction: () => void;
}

type UserProfileProps = {};

const ManageUserScreen = (props: UserProfileProps) => {
  const username = useAppSelector((state) => state.auth.user.userName);
  const navigate = useNavigate();
  const location = useLocation();
  const { hash: UrLHash } = location;
  const activeNavItem = UrLHash.substring(1).toString() ?? "Profile";

  const sideNavActions: NavActionsItem[] = [
    {
      icon: <Icon iconName="User" />,
      name: "Profile",
      onPressAction: () => navigate("/manage#Profile"),
    },
    {
      icon: <Icon iconName="CalendarOutline" />,
      name: "Events",
      onPressAction: () => navigate("/manage#Events"),
    },
    {
      icon: <Icon iconName="CarOutline" />,
      name: "Vehicles",
      onPressAction: () => navigate("/manage#Vehicles"),
    },
    {
      icon: <Icon iconName="LinkAddOutline" />,
      name: "Links",
      onPressAction: () => navigate("/manage#Links"),
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
          activeNavItem={activeNavItem !== "" ? activeNavItem : "Profile"}
        />
      }
      username={username}
    >
      <ManagaeUserScreenContent
        activeNavItem={
          activeNavItem !== ""
            ? (activeNavItem as "Links" | "Vehicles" | "Events" | "Profile")
            : "Profile"
        }
      />
    </AppLayout>
  );
};

export default ManageUserScreen;
