import { Icon } from "@simplimods/components";
import {
  AppLayout,
  LayoutType,
  ManageUserSideNavActions,
} from "@simplimods/layout";
import { ManagaeUserScreenContent } from "@simplimods/screens";
import type { ManageUserNavItems } from "@simplimods/types";
import React from "react";

import { ReactNode, useState } from "react";

export interface NavActionsItem {
  icon: ReactNode;
  name: ManageUserNavItems;
  onPressAction: () => void;
}

type UserProfileProps = {};

const ManageUserScreen = (props: UserProfileProps) => {
  const [activeNavItem, setActiveNavItem] =
    useState<ManageUserNavItems>("Profile");

  const sideNavActions: NavActionsItem[] = [
    {
      icon: <Icon iconName="User" />,
      name: "Profile",
      onPressAction: () => setActiveNavItem("Profile"),
    },
    {
      icon: <Icon iconName="CalendarOutline" />,
      name: "Events",
      onPressAction: () => setActiveNavItem("Events"),
    },
    {
      icon: <Icon iconName="CarOutline" />,
      name: "Vehicles",
      onPressAction: () => setActiveNavItem("Vehicles"),
    },
    {
      icon: <Icon iconName="LinkAddOutline" />,
      name: "Links",
      onPressAction: () => setActiveNavItem("Links"),
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
    >
      <ManagaeUserScreenContent activeNavItem={activeNavItem} />
    </AppLayout>
  );
};

export default ManageUserScreen;
