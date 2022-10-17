import { useState } from "react";
import { default as SignUpForm } from "../auth/SignUpForm";
import { IsMobileView } from "../utils/index";

import {
  Box,
  Flex,
  HStack,
  useBreakpointValue,
  VStack,
} from "@chakra-ui/react";

import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { auth } from "../firebase.config";

enum ActiveStates {
  LOGIN = "Login",
  SIGNUP = "Sign up",
}

type FormOpt = {
  label: ActiveStates;
};

const formOpts: FormOpt[] = [
  { label: ActiveStates.LOGIN },
  { label: ActiveStates.SIGNUP },
];

const Auth = () => {
  const isMobile = IsMobileView();
  const alignVstack = useBreakpointValue({ md: "center", lg: "start" });
  const [activeForm, setActiveForm] = useState<ActiveStates>(
    ActiveStates.LOGIN
  );
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);

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
              bg="primary.500"
              p={6}
              rounded="xl"
              minWidth="96"
              maxWidth={96}
            >
              <SignUpForm />
            </Box>
          </VStack>
        </VStack>
      </Flex>
    </HStack>
  );
};

export default Auth;
