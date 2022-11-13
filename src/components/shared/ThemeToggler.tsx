import { Switch, useColorMode } from "@chakra-ui/react";
import React from "react";

type ThemeTogglerProps = {};

export const ThemeToggler: React.FC<ThemeTogglerProps> = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  console.log(colorMode);

  return (
    <Switch
      size="md"
      colorScheme={colorMode === "dark" ? "red" : "black"}
      color="primary.200"
      outlineColor="transparent"
      isChecked={colorMode === "dark"}
      onChange={toggleColorMode}
    />
  );
};
export default ThemeToggler;
