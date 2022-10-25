import { componentsOverrites } from "./components.config";
import { appColors } from "./palette";
import { styles } from "./styles.config";

import { extendTheme, type ThemeConfig } from "@chakra-ui/react";

// 2. Call `extendTheme` and pass your custom values
// 2. Add your color mode config
const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const components = {
  componentsOverrites,
};

const theme = extendTheme({
  colors: appColors,
  components,
  styles,
  config,
});

export default theme;
