import { Heading, Stack, Text } from "@chakra-ui/react";
import React from "react";
import SignUpForm from "../../components/auth/SignUpForm";
import ThemeColorModeComponents from "../../theme/ThemeColorModeComponents";

interface SignupScreenProps {}

export const SignupScreen = (props: SignupScreenProps) => {
  return (
    <>
      <Stack spacing={4} mb={10}>
        <Heading
          color={ThemeColorModeComponents("accentThemeBg")}
          lineHeight={1.1}
          fontSize={{ base: "2xl", sm: "3xl", md: "4xl" }}
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
        <Text color={"gray.500"} fontSize={{ base: "sm", sm: "md" }}>
          Create an account and start sharing your car modifications, create or
          join events and more.
        </Text>
        <SignUpForm />
      </Stack>
    </>
  );
};

export default SignupScreen;
