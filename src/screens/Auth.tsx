import { useState } from "react";
import { default as SignUpForm } from "../auth/SignUpForm";
import { IsMobileView } from "../utils/index";

import {
  Box,
  Flex,
  HStack,
  Text,
  useBreakpointValue,
  VStack,
} from "@chakra-ui/react";

import LoginForm from "../auth/LoginForm";

enum ActiveStates {
  LOGIN = "Login",
  SIGNUP = "Sign up",
}

const Auth = () => {
  const isMobile = IsMobileView();
  const alignVstack = useBreakpointValue({ md: "center", lg: "start" });
  const [activeForm, setActiveForm] = useState<ActiveStates>(
    ActiveStates.LOGIN
  );

  return isMobile ? (
    <VStack height="full" width="full" spacing={0} bg="primary.600"></VStack>
  ) : (
    <HStack height="full" width="full" spacing={0} bg="primary.600">
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
              bg="secondary.300"
              p={6}
              rounded="xl"
              minWidth="96"
              maxWidth={96}
            >
              <Text
                fontSize="2xl"
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
