import { mode, StyleFunctionProps } from "@chakra-ui/theme-tools";
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
  Text: {
    variants: {
      // Make a variant, we'll call it `base` here and leave it empty
      base: (props: StyleFunctionProps | Record<string, any>) => ({
        color: mode("secondary.600", "primary.600")(props),
        _hover: {
          bg: "secondary.500",
        },
      }),

      s1: {
        fontSize: "16px",
        fontWeight: "semibold",
      },
    },
  },
  Button: {
    variants: {
      // Make a variant, we'll call it `base` here and leave it empty
      base: (props: StyleFunctionProps | Record<string, any>) => ({
        bg: mode("primary", "turquoise")(props),
        _hover: {
          bg: "primary.500",
        },
      }),

      secondary: (props: StyleFunctionProps | Record<string, any>) => ({
        color: mode("primary.100", "wzy")(props),
        _hover: {
          bg: "primary.500",
        },
      }),
    },
  },
  Input: {
    baseStyle: {
      field: {
        rounded: "2xl",
        borderRadius: "sm",
        backgroundColor: "red",
        height: 16,
        ":focus": {
          borderColor: "#a970ff",
          bg: "#000",
        },
      },
    },
    sizes: {},
    variants: {},
    defaultProps: {
      variant: null, // null here
    },
  },
};

const theme = extendTheme({
  colors: appColors,
  components,
  styles,
  config,
});

export default theme;
