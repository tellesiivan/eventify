import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  DrawerProps,
} from "@chakra-ui/react";
import React from "react";

interface ShareDrawerProps extends DrawerProps {
  title: string;
  isOpen: boolean;
  placement?: "top" | "left" | "bottom" | "right" | "start" | "end";
  onClose: () => void;
  children: React.ReactNode;
}

export const ShareDrawer = ({
  isOpen,
  onClose,
  children,
  title,
  placement = "bottom",
  ...props
}: ShareDrawerProps) => {
  return (
    <Drawer placement={placement} onClose={onClose} isOpen={isOpen} {...props}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerHeader borderBottomWidth="1px">{title}</DrawerHeader>
        <DrawerBody>{children}</DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};
