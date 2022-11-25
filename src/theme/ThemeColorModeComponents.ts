import { useColorModeValue } from "@chakra-ui/react";

type ColorModeComponents = "borderColor" | "accentThemeBg";

export const ThemeColorModeComponents = (
  colorModeComponent: ColorModeComponents
) => {
  const borderColor = useColorModeValue("primary.800", "secondary.700");
  const accentThemeBg = useColorModeValue("primary.800", "secondary.800");

  switch (colorModeComponent) {
    case "borderColor":
      return borderColor;
    case "accentThemeBg":
      return accentThemeBg;
    default:
      break;
  }
};

export default ThemeColorModeComponents;
