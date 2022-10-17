import { extendTheme, type ThemeConfig } from "@chakra-ui/react";
import { componentsOverrites as Button } from "./components.config";
import { appColors } from "./palette";

// 2. Call `extendTheme` and pass your custom values
// 2. Add your color mode config
const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const theme = extendTheme({
  colors: appColors,
  styles: {
    global: () => ({
      body: {
        height: "auto",
        bg: "primary.600",
      },
      root: {
        height: "full",
      },
    }),
  },
  components: {
    Button,
  },
  config,
});

export default theme;
