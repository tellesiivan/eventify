import { useColorModeValue } from "@chakra-ui/react";

type ColorModeComponents =
  | "borderColor"
  | "accentThemeBg"
  | "accentThemeBgDos"
  | "baseBg";

export const ThemeColorModeComponents = (
  colorModeComponent: ColorModeComponents
) => {
  const baseBg = useColorModeValue("primary.50", "secondary.900");
  const borderColor = useColorModeValue("primary.800", "secondary.700");
  const accentThemeBg = useColorModeValue("primary.800", "secondary.800");
  const accentThemeBgDos = useColorModeValue("primary.500", "secondary.700");

  switch (colorModeComponent) {
    case "borderColor":
      return borderColor;
    case "accentThemeBg":
      return accentThemeBg;
    case "accentThemeBgDos":
      return accentThemeBgDos;
    case "baseBg":
      return baseBg;
    default:
      break;
  }
};

export default ThemeColorModeComponents;
