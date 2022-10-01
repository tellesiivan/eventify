import { useBreakpointValue } from "@chakra-ui/react";

export const IsMobileView = () => {
  return useBreakpointValue({
    base: true,
    md: false,
  });
};
