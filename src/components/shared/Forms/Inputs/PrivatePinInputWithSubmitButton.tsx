import { Button, HStack, PinInput, PinInputField } from "@chakra-ui/react";
import { Icon } from "@simplimods/components";

import React, { useState } from "react";
import { ThemeColorModeComponents } from "@simplimods/theme";

interface PrivatePinInputWithSubmitButtonProps {
  isDisabled?: boolean;
}

export const PrivatePinInputWithSubmitButton = (
  props: PrivatePinInputWithSubmitButtonProps
) => {
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  return (
    <HStack spacing={4}>
      <HStack>
        <PinInput
          mask={isDisabled}
          isDisabled={isDisabled}
          size="md"
          focusBorderColor="wzy.300"
          onComplete={(value) => console.log(value)}
        >
          <PinInputField />
          <PinInputField />
          <PinInputField />
          <PinInputField />
        </PinInput>
      </HStack>

      <Button
        onClick={() => setIsDisabled((prev) => !prev)}
        variant="iconButton"
        background={ThemeColorModeComponents("baseBg")}
        color={ThemeColorModeComponents("reverseBaseBg")}
      >
        <Icon iconName="EditPencil" />
      </Button>
    </HStack>
  );
};
