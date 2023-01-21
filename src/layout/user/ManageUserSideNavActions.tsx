import React, { ReactNode } from "react";

import { Stack, StackItem, useColorModeValue } from "@chakra-ui/react";

import type { ManageUserNavigationTabItems } from "@simplimods/types";

export interface NavActionsItem {
  icon: ReactNode;
  name: ManageUserNavigationTabItems;
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
  const inActiveItemColor = useColorModeValue("secondary.900", "primary.50");

  return (
    <Stack align="center" my={4} w="full" position="relative">
      {sideNavActions.map((navItem: NavActionsItem) => (
        <StackItem
          position="relative"
          rounded="full"
          flexDirection="row"
          justifyContent="center"
          backgroundColor={
            activeNavItem === navItem.name ? navItemBgHover : undefined
          }
          _hover={{
            bg: activeNavItem !== navItem.name ? navItemBgHover : undefined,
          }}
          color={inActiveItemColor}
          cursor="pointer"
          onClick={navItem.onPressAction}
          key={navItem.name}
          width="full"
          alignItems="center"
          display="flex"
          h={14}
          w={14}
        >
          {navItem.icon}
          {/*<Text*/}
          {/*  variant="p1"*/}
          {/*  color={*/}
          {/*    activeNavItem === navItem.name ? "primary.50" : inActiveItemColor*/}
          {/*  }*/}
          {/*>*/}
          {/*  {navItem.name}*/}
          {/*</Text>*/}
        </StackItem>
      ))}
    </Stack>
  );
};
