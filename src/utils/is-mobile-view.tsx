import { useBreakpointValue } from "@chakra-ui/react";

export const IsMobileView = (): boolean => {
  return !!useBreakpointValue({
    base: true,
    md: false,
  });
};
