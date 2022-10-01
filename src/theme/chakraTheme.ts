import { extendTheme } from "@chakra-ui/react";
import { componentsOverrites } from "./components.config";
import { appColors } from "./palette";

// 2. Call `extendTheme` and pass your custom values
const theme = extendTheme({
  colors: appColors,
  components: componentsOverrites,
});

export default theme;
