import { Flex, Text } from "@chakra-ui/react";
import React from "react";

import type { StackProps } from "@chakra-ui/react";

interface TextHeaderProps extends StackProps {
  title: string;
  description?: string;
}

export const TextHeader = (props: TextHeaderProps) => {
  return (
    <Flex
      flexDirection="column"
      spacing={props.description ? 2 : 0}
      {...props}
      width="full"
    >
      <Text variant="h3b" mr="auto">
        {props.title}
      </Text>
      {props.description && (
        <Text variant="s3" mr="auto">
          {props.description}
        </Text>
      )}
    </Flex>
  );
};

export default TextHeader;
