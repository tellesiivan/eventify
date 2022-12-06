import { Button, useColorMode } from "@chakra-ui/react";
import { Icon } from "@simplimods/components";
import React from "react";

type ThemeTogglerProps = {};

export const ThemeToggler: React.FC<ThemeTogglerProps> = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Button
      onClick={toggleColorMode}
      variant="unstyled"
      justifyItems="center"
      alignItems="center"
      display="flex"
    >
      <Icon
        iconName={colorMode === "dark" ? "LightbulbOutline" : "LightbulbFilled"}
        color={colorMode === "dark" ? "primary.50" : "wzy.500"}
        size={6}
      />
    </Button>
  );
};
export default ThemeToggler;
