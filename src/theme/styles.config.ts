import type { StyleFunctionProps } from "@chakra-ui/styled-system";
import { mode } from "@chakra-ui/theme-tools";

export const styles = {
  global: (props: StyleFunctionProps) => ({
    body: {
      height: "auto",
      bg: mode("primary.100", "secondary.800")(props),
    },
  }),
};
