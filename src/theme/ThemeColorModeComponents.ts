import { useColorModeValue } from "@chakra-ui/react";

type ColorModeComponents =
  | "borderColor"
  | "accentThemeBg"
  | "accentThemeBgDos"
  | "baseBg"
  | "highlight"
  | "reverseBaseBg"
  | "toastBg"
  | "errorBg"
  | "successBg";

export const ThemeColorModeComponents = (
  colorModeComponent: ColorModeComponents
) => {
  const baseBg = useColorModeValue("primary.50", "secondary.900");
  const toastBg = useColorModeValue("primary.300", "secondary.700");
  const reverseBaseBg = useColorModeValue("secondary.900", "primary.50");
  const borderColor = useColorModeValue("primary.500", "secondary.700");
  const accentThemeBg = useColorModeValue("primary.400", "secondary.800");
  const accentThemeBgDos = useColorModeValue("primary.500", "secondary.700");
  const highlight = useColorModeValue("wzp.700", "wzp.500");

  //
  const successBg = useColorModeValue("wzg.700", "wzg.800");
  const errorBg = useColorModeValue("error.700", "error.800");

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
    case "highlight":
      return highlight;
    case "errorBg":
      return errorBg;
    case "successBg":
      return successBg;
    case "toastBg":
      return toastBg;
    default:
      break;
  }
};

export default ThemeColorModeComponents;
