import { StyleFunctionProps } from "@chakra-ui/react";

export const componentsOverrites = {
  components: {
    Button: {
      variants: {
        link: (props: StyleFunctionProps) => ({
          _hover: {
            backgroundColor: "none",
          },
        }),
      },
    },
  },
};
