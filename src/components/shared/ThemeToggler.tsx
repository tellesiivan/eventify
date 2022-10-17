import { Switch, useColorMode } from "@chakra-ui/react";
import React from "react";

type ThemeTogglerProps = {};

export const ThemeToggler: React.FC<ThemeTogglerProps> = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Switch
      size="md"
      colorScheme={colorMode === "dark" ? "pink" : "black"}
      color="primary.600"
      outlineColor="transparent"
      isChecked={colorMode === "dark"}
      onChange={toggleColorMode}
    />
  );
};
export default ThemeToggler;
