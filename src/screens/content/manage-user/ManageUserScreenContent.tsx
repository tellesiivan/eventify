import React from "react";

import { Box, Text } from "@chakra-ui/react";
import { ManagerUserProfileContent } from "@simplimods/screens";
import { ManageUserNavItems } from "@simplimods/types";

interface ManagaeUserScreenContentProps {
  activeNavItem: ManageUserNavItems;
}

/** makes sure the key is keyof <ManageUserNavItems> and value would be a <ReactNode> */
type ManageUserContentSections = Record<ManageUserNavItems, React.ReactNode>;

export const ManagaeUserScreenContent = ({
  activeNavItem,
}: ManagaeUserScreenContentProps) => {
  const manageUserContent: ManageUserContentSections = {
    Profile: <ManagerUserProfileContent />,
    Events: <Text variant="s1">MANAGE PAGE FOR : Events</Text>,
    Links: <Text variant="s1">MANAGE PAGE FOR : Links</Text>,
    Vehicles: <Text variant="s1">MANAGE PAGE FOR : Vehicles</Text>,
  };

  return <Box>{manageUserContent[activeNavItem]}</Box>;
};

export default ManagaeUserScreenContent;
