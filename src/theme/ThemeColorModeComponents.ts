import { useColorModeValue } from "@chakra-ui/react";

type ColorModeComponents =
  | "borderColor"
  | "accentThemeBg"
  | "accentThemeBgDos"
  | "baseBg"
  | "reverseBaseBg";

export const ThemeColorModeComponents = (
  colorModeComponent: ColorModeComponents
) => {
  const baseBg = useColorModeValue("primary.50", "secondary.900");
  const reverseBaseBg = useColorModeValue("secondary.900", "primary.50");
  const borderColor = useColorModeValue("transparent", "secondary.700");
  const accentThemeBg = useColorModeValue("primary.400", "secondary.800");
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
    case "reverseBaseBg":
      return reverseBaseBg;
    default:
      break;
  }
};

export default ThemeColorModeComponents;
