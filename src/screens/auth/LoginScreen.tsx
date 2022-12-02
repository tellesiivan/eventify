import { useAuth0 } from "@auth0/auth0-react";
import { Box, Button, Heading, Stack, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { PressableNoticeText } from "../../components/shared";
import ThemeColorModeComponents from "../../theme/ThemeColorModeComponents";

export function LoginScreen() {
  const { loginWithRedirect, isAuthenticated, isLoading } = useAuth0();

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
        <Button
          isLoading={isLoading}
          type="submit"
          variant="secondary"
          width="full"
          rounded="md"
          onClick={() => loginWithRedirect()}
        >
          Login
        </Button>
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
