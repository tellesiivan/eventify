import React from "react";

import { ReactNode, useState } from "react";
import { AppLayout, ManageUserSideNavActions } from "../../../layout/";

import { LayoutType } from "../../../layout/AppLayout";
import { ManagaeUserScreenContent } from "../../content";

import { Icon } from "../../../components/shared";
import type { ManageUserNavItems } from "../../../types";

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
      icon: <Icon iconName="CurrencySignOutline" />,
      name: "Listings",
      onPressAction: () => setActiveNavItem("Listings"),
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
