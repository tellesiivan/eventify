import React from "react";

import { Box, Text } from "@chakra-ui/react";
import type { ManageUserNavItems } from "../../types";

interface ManagaeUserScreenContentProps {
  activeNavItem: ManageUserNavItems;
}

/** makes sure the key is keyof <ManageUserNavItems> and value would be a <ReactNode> */
type ManageUserContentSections = Record<ManageUserNavItems, React.ReactNode>;

export const ManagaeUserScreenContent = ({
  activeNavItem,
}: ManagaeUserScreenContentProps) => {
  const manageUserContent: ManageUserContentSections = {
    Profile: <Text variant="s1">MANAGE PAGE FOR : Profile</Text>,
    Events: <Text variant="s1">MANAGE PAGE FOR : Events</Text>,
    Links: <Text variant="s1">MANAGE PAGE FOR : Links</Text>,
    Vehicles: <Text variant="s1">MANAGE PAGE FOR : Vehicles</Text>,
  };

  return (
    <Box>
      <Box h={48} w="full" bg="wzy.500" rounded="lg" />
      <Box>{manageUserContent[activeNavItem]}</Box>
    </Box>
  );
};

export default ManagaeUserScreenContent;
