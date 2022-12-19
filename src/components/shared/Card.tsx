import type { StyleProps } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";
import { ThemeColorModeComponents } from "@simplimods/theme";
import React from "react";

interface CardProps extends StyleProps {
  children: React.ReactNode;
  responsiveFlexCard?: boolean;
}

export const Card = ({
  responsiveFlexCard = false,
  children,
  ...props
}: CardProps) => {
  if (responsiveFlexCard && children) {
    return (
      <Box
        width="full"
        p={2}
        bg={ThemeColorModeComponents("accentThemeBg")}
        display="flex"
        alignItems="center"
        flexDirection={{
          base: "column",
          lg: "row",
        }}
        justifyContent={{
          base: "stretch",
          lg: "space-between",
        }}
        {...props}
      >
        {children[0 as keyof typeof children]}
        {children[1 as keyof typeof children]}
      </Box>
    );
  }
  return (
    <Box p={2} bg={ThemeColorModeComponents("accentThemeBg")} {...props}>
      {children}
    </Box>
  );
};

export default Card;
