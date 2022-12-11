import { Button, Text } from "@chakra-ui/react";
import { Icon } from "@simplimods/components/shared";
import React from "react";

interface AuthGoogleLoginButtonProps {}

export const AuthGoogleLoginButton = (props: AuthGoogleLoginButtonProps) => {
  return (
    <Button
      bg="#1550f5"
      color="primary.50"
      py={6}
      variant="solid"
      rightIcon={<Icon iconName="QuestionMark" />}
      width="full"
    >
      <Text variant="s2">Continue with Google</Text>
    </Button>
  );
};

export default AuthGoogleLoginButton;
