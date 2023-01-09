import { Box, Button } from "@chakra-ui/react";
import React from "react";

interface LeftContentNavigationProps {
  onClickAction: () => void;
  label: string;
}

export const LeftContentNavigation = ({
  onClickAction,
  label,
}: LeftContentNavigationProps) => {
  return (
    <Box
      position="fixed"
      bottom={4}
      right={0}
      left={{
        base: 0,
        md: 36,
      }}
      display="flex"
      width="full"
      justifyContent="center"
    >
      <Button variant="float" onClick={onClickAction}>
        {label}
      </Button>
    </Box>
  );
};
