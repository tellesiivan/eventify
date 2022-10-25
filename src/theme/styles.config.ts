import type { StyleFunctionProps } from "@chakra-ui/styled-system";
import { mode } from "@chakra-ui/theme-tools";

export const styles = {
  global: (props: StyleFunctionProps) => ({
    body: {
      height: "auto",
      color: mode("gray.800", "whiteAlpha.900")(props),
      bg: mode("primary.600", "secondary.600")(props),
    },
  }),
};
