import React from "react";

import { useState } from "react";

import { Box, Text, VStack } from "@chakra-ui/react";

import LoginForm from "../components/auth/LoginForm";
import SignUpForm from "../components/auth/SignUpForm";

enum ActiveStates {
  LOGIN = "Login",
  SIGNUP = "Sign up",
}

const Auth = () => {
  const [activeForm, setActiveForm] = useState<ActiveStates>(
    ActiveStates.LOGIN
  );

  return (
    <VStack justifyContent="center" spacing={1} width="full" minHeight="100vh">
      <Box
        _dark={{
          bg: "secondary.600",
        }}
        bg="primary.600"
        py={8}
        minWidth={96}
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
        {activeForm === ActiveStates.LOGIN ? <LoginForm /> : <SignUpForm />}
      </Box>
    </VStack>
  );
};

export default Auth;
