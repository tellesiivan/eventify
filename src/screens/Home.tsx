import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Heading,
  HStack,
  Image,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { IsMobileView } from "../utils/index";

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

const Home = () => {
  const isMobile = IsMobileView();
  const [activeForm, setActiveForm] = useState<ActiveStates>(
    ActiveStates.LOGIN
  );

  return isMobile ? (
    <VStack height="full" width="full" spacing={0} bg="primary.600"></VStack>
  ) : (
    <HStack height="full" width="full" spacing={0} bg="primary.600">
      <div className="relative w-1/2 h-full ">
        <Image
          src="https://images.unsplash.com/photo-1629008149868-f25b10ba225d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
          alt="Home page, "
          className="absolute inset-0 object-cover object-center w-full h-full"
        />
      </div>
      <Flex
        height="full"
        flex={1}
        justifyContent="center"
        alignItems="center"
        padding={3}
      >
        <VStack spacing={6} align="start">
          <Heading as="h2" size="3xl" color="white">
            Happening now.
          </Heading>
          <Box>
            <HStack alignItems="center" spacing={3}>
              <ButtonGroup
                _hover={{ backgroundColor: "none" }}
                variant="unstyled"
                color="white"
              >
                {formOpts.map((opt) => (
                  <Button
                    key={opt.label}
                    onClick={() => setActiveForm(opt.label)}
                    as="h2"
                    fontSize="2xl"
                    color={`${opt.label === activeForm ? "razz.600" : "white"}`}
                    className="cursor-pointer"
                  >
                    {opt.label}
                  </Button>
                ))}
              </ButtonGroup>
            </HStack>
          </Box>
          <Box color="white">Show {activeForm} form</Box>
        </VStack>
      </Flex>
    </HStack>
  );
};

export default Home;
