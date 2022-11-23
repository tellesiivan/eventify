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
        fontSize: "13px",
        fontWeight: "semibold",
      },
      s2: {
        fontSize: "12px",
        fontWeight: "regular",
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
    sizes: {},
    variants: {
      base: (props: StyleFunctionProps | Record<string, any>) => ({
        bg: mode("primary", "secondary.200")(props),
        field: {
          py: "6",
          rounded: "xl",
          fontSize: { base: "md", lg: "sm" },
          color: mode("secondary.400", "primary.400")(props),
          bg: mode("primary.50", "secondary.300")(props),
          _placeholder: {
            color: mode("secondary.100", "secondary.50")(props),
          },
          // ":focus": {
          //   bg: mode("primary.500", "secondary.300")(props),
          // },
        },
      }),
    },
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
