import { mode, StyleFunctionProps } from "@chakra-ui/theme-tools";
import { appColors } from "./palette";
import { styles } from "./styles.config";

import { extendTheme, StyleConfig, type ThemeConfig } from "@chakra-ui/react";

// 2. Call `extendTheme` and pass your custom values
// 2. Add your color mode config
const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: true,
};

const components: Record<string, StyleConfig> = {
  Text: {
    variants: {
      // Make a variant, we'll call it `base` here and leave it empty
      base: (props: StyleFunctionProps | Record<string, any>) => ({
        color: mode("secondary.600", "primary.600")(props),
        _hover: {
          bg: "secondary.500",
        },
      }),

      //

      s1: (props: StyleFunctionProps | Record<string, any>) => ({
        fontSize: "md",
        fontWeight: "semibold",
        color: mode("secondary.400", "primary.800")(props),
      }),
      p1: (props: StyleFunctionProps | Record<string, any>) => ({
        fontSize: "sm",
        fontWeight: "semibold",
        color: mode("secondary.800", "primary.800")(props),
      }),
      s2: (props: StyleFunctionProps | Record<string, any>) => ({
        fontSize: "sm",
        fontWeight: "regular",
        color: mode("secondary.600", "secondary.200")(props),
      }),

      s3: (props: StyleFunctionProps | Record<string, any>) => ({
        fontSize: "xs",
        fontWeight: "regular",
        color: mode("secondary.600", "secondary.200")(props),
      }),

      h2sb: {
        fontSize: "md",
        fontWeight: "semibold",
      },
      h2b: {
        fontSize: "md",
        fontWeight: "bold",
      },
      h3sb: {
        fontSize: "sm",
        fontWeight: "semibold",
      },
      h3b: {
        fontSize: "sm",
        fontWeight: "bold",
      },
    },
  },
  Link: {
    variants: {
      // Make a variant, we'll call it `base` here and leave it empty
      base: (props: StyleFunctionProps | Record<string, any>) => ({
        color: mode("secondary.600", "primary.600")(props),
        _hover: {
          bg: "secondary.500",
        },
      }),

      nav: (props: StyleFunctionProps | Record<string, any>) => ({
        fontSize: "sm",
        color: "primary.50",
      }),
    },
  },
  Button: {
    variants: {
      // Make a variant, we'll call it `base` here and leave it empty
      base: (props: StyleFunctionProps | Record<string, any>) => ({
        bg: mode("primary", "turquoise")(props),
      }),

      secondary: (props: StyleFunctionProps | Record<string, any>) => ({
        bg: mode("secondary.900", "primary.100")(props),
        color: mode("primary.100", "secondary.600")(props),
        cursor: "pointer",
        py: 6,
        fontSize: "sm",
        _hover: {
          bg: mode("secondary.800", "primary.800")(props),
        },
      }),
      iconButton: (props: StyleFunctionProps | Record<string, any>) => ({
        bg: mode("wzp.400", "wzg.200")(props),
        color: mode("primary.400", "secondary.600")(props),
        h: 10,
        w: 10,
        rounded: "full",
        _hover: {
          bg: mode("wzp.200", "wzg.400")(props),
        },
      }),
    },
  },
  Input: {
    sizes: {},
    variants: {
      base: (props: StyleFunctionProps | Record<string, any>) => ({
        bg: mode("primary.900", "secondary.200")(props),

        field: {
          py: "7",
          rounded: "lg",
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
      v1: (props: StyleFunctionProps | Record<string, any>) => ({
        field: {
          py: "7",
          rounded: "lg",
          fontSize: { base: "md", lg: "sm" },
          color: mode("secondary.400", "primary.400")(props),
          bg: mode("primary.500", "secondary.700")(props),
          _placeholder: {
            fontSize: "sm",
            color: mode("secondary.100", "secondary.400")(props),
          },
          // ":focus": {
          //   bg: mode("primary.500", "secondary.300")(props),
          // },
        },
      }),
    },
    defaultProps: {
      variant: undefined, // null here
    },
  },
  InputGroup: {
    sizes: {},
    variants: {
      base: (props: StyleFunctionProps | Record<string, any>) => ({
        bg: mode("primary.900", "secondary.200")(props),

        field: {
          py: "7",
          rounded: "lg",
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
      v1: (props: StyleFunctionProps | Record<string, any>) => ({
        field: {
          py: "7",
          rounded: "lg",
          fontSize: { base: "md", lg: "sm" },
          color: mode("secondary.400", "primary.400")(props),
          bg: mode("primary.500", "secondary.700")(props),
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
      variant: undefined, // null here
    },
  },
  FormLabel: {
    sizes: {},
    variants: {
      base: (props: StyleFunctionProps | Record<string, any>) => ({
        color: mode("secondary.200", "primary.400")(props),
        fontSize: { base: "sm", lg: "xs" },
      }),
    },
    defaultProps: {
      variant: undefined, // null here
    },
  },
};

const theme = extendTheme({
  fonts: {
    heading: `"Azeret Mono", monospace`,
    body: `"Azeret Mono", monospace`,
  },
  colors: appColors,
  components,
  styles,
  config,
});

export default theme;
