import type { StyleFunctionProps } from "@chakra-ui/styled-system";
import { mode } from "@chakra-ui/theme-tools";

export const styles = {
  global: (props: StyleFunctionProps) => ({
    body: {
      height: "auto",
      bg: mode("primary.50", "secondary.900")(props),
    },
  }),
};
