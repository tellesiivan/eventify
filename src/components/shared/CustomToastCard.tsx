import React from "react";
import { ThemeColorModeComponents } from "@simplimods/theme";
import { Text, VStack } from "@chakra-ui/react";

type ToastType = "error" | "success" | "neutral";

interface CustomToastCardProps {
  title: string;
  description?: string;
  type: ToastType;
}

export const CustomToastCard = ({
  title,
  description,
  type = "neutral",
}: CustomToastCardProps) => {
  // declare colors
  const neutralBg = ThemeColorModeComponents("toastBg");
  const neutralColor = ThemeColorModeComponents("reverseBaseBg");
  const errorBg = ThemeColorModeComponents("errorBg");
  const successBg = ThemeColorModeComponents("successBg");
  const borderColor = ThemeColorModeComponents("borderColor");

  let colorScheme: Record<"bg" | "text", string | undefined> = {
    bg: neutralBg,
    text: neutralColor,
  };

  if (type === "success") {
    colorScheme = {
      bg: "success.100",
      text: successBg,
    };
  } else if (type === "error") {
    colorScheme = {
      bg: "error.100",
      text: errorBg,
    };
  }
  return (
    <VStack
      flexDirection="column"
      spacing={1}
      backgroundColor={colorScheme.bg ?? undefined}
      dropShadow="2xl"
      p={4}
      rounded="md"
    >
      <Text variant="h3b" mr="auto" color={colorScheme.text ?? undefined}>
        {title}
      </Text>
      {description && (
        <Text variant="s3" mr="auto" color={colorScheme.text ?? undefined}>
          {description}
        </Text>
      )}
    </VStack>
  );
};
