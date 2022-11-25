import React from "react";

import { AiOutlineCar, AiOutlineUser } from "react-icons/ai";
import { BsCalendar4Range, BsLink45Deg } from "react-icons/bs";

import { ReactNode, useState } from "react";
import { AppLayout, ManageUserSideNavActions } from "../../../layout/";

import { Icon } from "@chakra-ui/react";
import { LayoutType } from "../../../layout/AppLayout";
import { ManagaeUserScreenContent } from "../../content";

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
      icon: <Icon as={AiOutlineUser} />,
      name: "Profile",
      onPressAction: () => setActiveNavItem("Profile"),
    },
    {
      icon: <Icon as={BsCalendar4Range} />,
      name: "Events",
      onPressAction: () => setActiveNavItem("Events"),
    },
    {
      icon: <Icon as={AiOutlineCar} />,
      name: "Vehicles",
      onPressAction: () => setActiveNavItem("Vehicles"),
    },
    {
      icon: <Icon as={BsLink45Deg} />,
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
