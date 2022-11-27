import type { StyleProps } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";
import React from "react";
import ThemeColorModeComponents from "../../theme/ThemeColorModeComponents";

interface CardProps extends StyleProps {
  children: React.ReactNode;
}

export const Card = (props: CardProps) => {
  return (
    <Box p={2} bg={ThemeColorModeComponents("accentThemeBgDos")} {...props}>
      {props.children}
    </Box>
  );
};

export default Card;
