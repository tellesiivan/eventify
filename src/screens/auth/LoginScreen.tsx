import { Divider, Heading, Stack, Text, VStack } from "@chakra-ui/react";
import { AuthGoogleLoginButton } from "@simplimods/components/auth";
import React from "react";
import LoginForm from "../../components/auth/LoginForm";
import ThemeColorModeComponents from "../../theme/ThemeColorModeComponents";

export function LoginScreen() {
  return (
    <React.Fragment>
      <Stack spacing={2} mb={8}>
        <Heading
          color={ThemeColorModeComponents("reverseBaseBg")}
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
        <Text
          color={ThemeColorModeComponents("reverseBaseBg")}
          fontSize={{ base: "sm", sm: "md" }}
        >
          Start sharing your modifications or creating events.
        </Text>
      </Stack>
      <VStack spacing={8}>
        <AuthGoogleLoginButton />
        <Divider />
        <LoginForm />
      </VStack>
    </React.Fragment>
  );
}
