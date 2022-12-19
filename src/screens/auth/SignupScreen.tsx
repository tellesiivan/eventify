import { Divider, Heading, Stack, Text, VStack } from "@chakra-ui/react";
import { AuthGoogleLoginButton, SignUpForm } from "@simplimods/components/auth";
import { ThemeColorModeComponents } from "@simplimods/theme";
import React from "react";

interface SignupScreenProps {}

export const SignupScreen = (props: SignupScreenProps) => {
  return (
    <>
      <Stack spacing={6}>
        <VStack>
          <Heading
            mr="auto"
            color={ThemeColorModeComponents("reverseBaseBg")}
            lineHeight={1.1}
            fontSize={{ base: "2xl", sm: "3xl" }}
          >
            Sign up
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
            Create an account and start sharing your car modifications, create
            or join events and more.
          </Text>
        </VStack>
        <VStack spacing={8}>
          {/* <AuthGoogleLoginButton />
          <Divider /> */}
          <SignUpForm />
        </VStack>
      </Stack>
    </>
  );
};

export default SignupScreen;
