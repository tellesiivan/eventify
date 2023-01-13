import type { StackProps } from "@chakra-ui/react";
import { Flex, Text } from "@chakra-ui/react";
import React from "react";

interface TextHeaderProps extends StackProps {
  title: string;
  isMainHeading?: boolean;
  description?: string;
}

export const TextHeader = ({
  title,
  description,
  isMainHeading = false,
  ...props
}: TextHeaderProps) => {
  return (
    <Flex
      flexDirection="column"
      spacing={description ? 3 : 0}
      {...props}
      width="full"
    >
      <Text variant={isMainHeading ? "h2sb" : "h3b"} mr="auto">
        {title}
      </Text>
      {description && (
        <Text variant="s3" mr="auto">
          {description}
        </Text>
      )}
    </Flex>
  );
};

export default TextHeader;
