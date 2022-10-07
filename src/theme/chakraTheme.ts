import { extendTheme } from "@chakra-ui/react";
import { componentsOverrites as Button } from "./components.config";
import { appColors } from "./palette";

// 2. Call `extendTheme` and pass your custom values
const theme = extendTheme({
  colors: appColors,
  styles: {
    global: () => ({
      body: {
        bg: "primary.600",
      },
    }),
  },
  components: {
    Button,
  },
});

export default theme;
