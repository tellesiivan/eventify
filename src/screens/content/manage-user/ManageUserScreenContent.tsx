import React from "react";

import { Text } from "@chakra-ui/react";
import { ManagerUserProfileContent } from "@simplimods/screens";
import { ManageUserNavigationTabItems } from "@simplimods/types";

interface ManagaeUserScreenContentProps {
  activeNavItem: ManageUserNavigationTabItems;
}

/** makes sure the key is keyof <ManageUserNavItems> and value would be a <ReactNode> */
type ManageUserContentSections = Record<
  ManageUserNavigationTabItems,
  JSX.Element
>;

export const ManagaeUserScreenContent = ({
  activeNavItem,
}: ManagaeUserScreenContentProps) => {
  const manageUserContent: ManageUserContentSections = {
    Profile: <ManagerUserProfileContent />,
    Events: <Text variant="s1">MANAGE PAGE FOR : Events</Text>,
    Links: <Text variant="s1">MANAGE PAGE FOR : Links</Text>,
    Vehicles: <Text variant="s1">MANAGE PAGE FOR : Vehicles</Text>,
  };

  return manageUserContent[`${activeNavItem}`];
};

export default ManagaeUserScreenContent;
