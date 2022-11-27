import React from "react";

import {
  Stack,
  StackItem,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";

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
  const navItemBg = useColorModeValue("primary.500", "secondary.800");
  const navItemBgHover = useColorModeValue("primary.400", "secondary.700");

  return (
    <Stack align="stretch">
      {sideNavActions.map((navItem: NavActionsItem) => (
        <StackItem
          flexDirection="row"
          px="4"
          py="3"
          bg={activeNavItem === navItem.name ? navItemBg : undefined}
          _hover={{
            bg: activeNavItem !== navItem.name ? navItemBgHover : undefined,
          }}
          cursor="pointer"
          onClick={navItem.onPressAction}
          key={navItem.name}
          width="full"
          alignItems="center"
          display="flex"
          m={0}
        >
          <VStack
            minW={6}
            mr={3}
            height={6}
            justifyContent="center"
            alignItems="center"
          >
            {navItem.icon}
          </VStack>
          <Text variant="s1">{navItem.name}</Text>
        </StackItem>
      ))}
    </Stack>
  );
};

export default ManageUserSideNavActions;
