import type { SkeletonProps as ChakraSkeletonProps } from "@chakra-ui/react";
import {
  Skeleton as ChakraSkeleton,
  SkeletonText,
  Stack,
} from "@chakra-ui/react";
import React from "react";
import { ThemeColorModeComponents } from "@simplimods/theme";

interface SkeletonProps extends ChakraSkeletonProps {
  height?: number;
  speed?: number;
  screenToMock?: "ManageUserProfile";
}

export const Skeleton = ({
  height,
  speed,
  screenToMock,
  ...props
}: SkeletonProps) => {
  switch (screenToMock) {
    case `ManageUserProfile`: {
      return (
        <Stack direction="column" spacing={3} mx={3} mt={4}>
          <SkeletonText
            rounded="full"
            maxWidth={72}
            skeletonHeight="3"
            noOfLines={2}
            startColor={ThemeColorModeComponents("accentThemeBg")}
            endColor={ThemeColorModeComponents("accentThemeBgDos")}
          />
          {[1, 2, 3, 4, 5].map((item) => (
            <ChakraSkeleton
              key={item}
              rounded="xl"
              width="full"
              h={item === 1 ? 48 : 36}
              speed={0.9}
              startColor={ThemeColorModeComponents("accentThemeBg")}
              endColor={ThemeColorModeComponents("accentThemeBgDos")}
            />
          ))}
        </Stack>
      );
    }
  }

  return (
    <ChakraSkeleton
      rounded="sm"
      width="full"
      h={height ?? 20}
      speed={speed ?? 0.9}
      {...props}
      startColor={ThemeColorModeComponents("accentThemeBg")}
      endColor={ThemeColorModeComponents("accentThemeBgDos")}
    />
  );
};

export default Skeleton;
