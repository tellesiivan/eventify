import React from "react";

import { Box, HStack, Text, useColorModeValue, VStack } from "@chakra-ui/react";
import { AppLayout } from "../";

import type { NavActionsItem } from "../../screens/user/auth/ManageUserScreen";
import type { ManageUserNavItems } from "../../types";

interface ManageUserSideNavActionsProps {
  sideNavActions: NavActionsItem[];
  activeNavItem: ManageUserNavItems;
}

export const ManageUserSideNavActions = ({
  sideNavActions,
  activeNavItem,
}: ManageUserSideNavActionsProps) => {
  const navItemBg = useColorModeValue("primary.50", "secondary.400");

  return (
    <AppLayout>
      <VStack m={0} p={0}>
        {sideNavActions.map((navItem: NavActionsItem) => (
          <HStack
            px="4"
            rounded="xl"
            py="3"
            bg={activeNavItem === navItem.name ? navItemBg : undefined}
            _hover={{
              bg: navItemBg,
            }}
            cursor="pointer"
            minHeight={10}
            onClick={navItem.onPressAction}
            key={navItem.name}
            width="full"
            alignItems="center"
          >
            <Box minW="10">{navItem.icon}</Box>
            <Text variant="s1">{navItem.name}</Text>
          </HStack>
        ))}
      </VStack>
    </AppLayout>
  );
};

export default ManageUserSideNavActions;
