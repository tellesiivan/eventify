import React, { ReactNode } from "react";

import {
  Stack,
  StackItem,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";

import type { ManageUserNavItems } from "@simplimods/types";

export interface NavActionsItem {
  icon: ReactNode;
  name: ManageUserNavItems;
  onPressAction: () => void;
}

interface ManageUserSideNavActionsProps {
  sideNavActions: NavActionsItem[];
  activeNavItem: string;
}

export const ManageUserSideNavActions = ({
  sideNavActions,
  activeNavItem,
}: ManageUserSideNavActionsProps) => {
  const navItemBgHover = useColorModeValue("primary.400", "secondary.800");

  return (
    <Stack align="stretch" m={2}>
      {sideNavActions.map((navItem: NavActionsItem) => (
        <StackItem
          rounded="md"
          flexDirection="row"
          px="4"
          py="3"
          bg={activeNavItem === navItem.name ? "wzy.500" : undefined}
          _hover={{
            bg: activeNavItem !== navItem.name ? navItemBgHover : undefined,
          }}
          color={activeNavItem === navItem.name ? "secondary.900" : undefined}
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
          <Text
            variant="p1"
            color={activeNavItem === navItem.name ? "secondary.900" : undefined}
          >
            {navItem.name}
          </Text>
        </StackItem>
      ))}
    </Stack>
  );
};

export default ManageUserSideNavActions;
