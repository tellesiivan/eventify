import React from "react";

import { useState } from "react";

import {
  Box,
  Flex,
  HStack,
  Text,
  useBreakpointValue,
  VStack,
} from "@chakra-ui/react";

import LoginForm from "../components/auth/LoginForm";
import SignUpForm from "../components/auth/SignUpForm";

enum ActiveStates {
  LOGIN = "Login",
  SIGNUP = "Sign up",
}

const Auth = () => {
  const alignVstack = useBreakpointValue({ md: "center", lg: "start" });
  const [activeForm, setActiveForm] = useState<ActiveStates>(
    ActiveStates.LOGIN
  );

  return (
    <HStack height="full" width="full" spacing={0}>
      <Flex
        height="full"
        flex={1}
        justifyContent="center"
        alignItems="center"
        padding={3}
      >
        <VStack align={alignVstack}>
          <VStack align={alignVstack} spacing={1}>
            <Box
              _dark={{
                bg: "secondary.600",
              }}
              p={6}
              minWidth="96"
              maxWidth={96}
            >
              <Text
                textAlign="center"
                mb={8}
                onClick={() =>
                  setActiveForm((prev) =>
                    prev === ActiveStates.LOGIN
                      ? ActiveStates.SIGNUP
                      : ActiveStates.LOGIN
                  )
                }
              >
                {activeForm}
              </Text>
              {activeForm === ActiveStates.LOGIN ? (
                <LoginForm />
              ) : (
                <SignUpForm />
              )}
            </Box>
          </VStack>
        </VStack>
      </Flex>
    </HStack>
  );
};

export default Auth;
