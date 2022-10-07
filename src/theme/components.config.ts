import { mode, StyleFunctionProps } from "@chakra-ui/theme-tools";
export const componentsOverrites = {
  baseStyle: {
    // ...define your base styles
  },
  variants: {
    // Make a variant, we'll call it `base` here and leave it empty
    turquoise: {
      bg: "turquoise.600",
    },

    base: (props: StyleFunctionProps | Record<string, any>) => ({
      bg: mode("primary", "turquoise")(props),
      _hover: {
        bg: "primary.500",
      },
    }),

    secondary: {
      //...define other variants
    },
  },
  defaultProps: {},
};
