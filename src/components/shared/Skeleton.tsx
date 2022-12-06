import type { SkeletonProps as ChakraSkeletonProps } from "@chakra-ui/react";
import { Skeleton as ChakraSkeleton } from "@chakra-ui/react";
import React from "react";
import { ThemeColorModeComponents } from "@simplimods/theme";

interface SkeletonProps extends ChakraSkeletonProps {
  height?: number;
  speed?: number;
}

export const Skeleton = (props: SkeletonProps) => {
  return (
    <ChakraSkeleton
      rounded="sm"
      width="full"
      h={props.height ?? 20}
      speed={props.speed ?? 0.9}
      {...props}
      startColor={ThemeColorModeComponents("accentThemeBg")}
      endColor={ThemeColorModeComponents("accentThemeBgDos")}
    />
  );
};

export default Skeleton;
