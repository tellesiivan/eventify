import { Box, Heading, Stack, Text, VStack } from "@chakra-ui/react";
import React from "react";
import LoginForm from "../../components/auth/LoginForm";
import { PressableNoticeText } from "../../components/shared";
import ThemeColorModeComponents from "../../theme/ThemeColorModeComponents";

export function LoginScreen() {
  return (
    <Box>
      <Stack spacing={4} mb={10}>
        <Heading
          color={ThemeColorModeComponents("accentThemeBg")}
          lineHeight={1.1}
          fontSize={{ base: "2xl", sm: "3xl" }}
        >
          Login
          <Text
            as={"span"}
            bgGradient="linear(to-r, red.400,pink.400)"
            bgClip="text"
          >
            .
          </Text>
        </Heading>
        <Text color={"gray.500"} fontSize={{ base: "sm", sm: "md" }}>
          Start sharing your modifications or creating events.
        </Text>
      </Stack>
      <VStack mt="auto">
        <LoginForm />
        <PressableNoticeText
          link="/auth/signup"
          textContent="Don't have an account? Sign up"
          textAlign="center"
          py="4"
          color={ThemeColorModeComponents("baseBg")}
        />
      </VStack>
    </Box>
  );
}
