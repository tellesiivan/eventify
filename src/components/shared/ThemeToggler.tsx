import { Button, Tooltip, useColorMode } from "@chakra-ui/react";
import { Icon } from "@simplimods/components";
import React from "react";

type ThemeTogglerProps = {};

export const ThemeToggler: React.FC<ThemeTogglerProps> = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Tooltip
      closeDelay={500}
      variant="t1"
      placement="bottom-start"
      label={
        colorMode === "dark" ? "Switch to light mode" : "Switch to dark mode"
      }
    >
      <Button
        onClick={toggleColorMode}
        variant="unstyled"
        justifyItems="center"
        alignItems="center"
        display="flex"
      >
        <Icon
          iconName={
            colorMode === "dark" ? "LightbulbOutline" : "LightbulbFilled"
          }
          color={colorMode === "dark" ? "primary.50" : "wzy.300"}
          size={6}
        />
      </Button>
    </Tooltip>
  );
};
export default ThemeToggler;
