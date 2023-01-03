import { Button, HStack, PinInput, PinInputField } from "@chakra-ui/react";
import { ThemeColorModeComponents } from "@simplimods/theme";
import React, { useState } from "react";

interface PrivatePinInputWithSubmitButtonProps {
  initialPin: string | null;
}

/**
 * Handles user pin submission, can update existing pin by adding @param:initialPin.
 * If user closes pin PrivatePinInputWithSubmitButton without updating existing, it will return to initial pin
 * */
export const PrivatePinInputWithSubmitButton = ({
  initialPin,
}: PrivatePinInputWithSubmitButtonProps) => {
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [pin, setIPin] = useState<string>(initialPin ?? "");

  const handlePinResetOrClose = () => {
    if (initialPin) {
      setIPin(initialPin);
    } else {
      setIPin("");
    }
    setIsDisabled(true);
  };
  const handlePinSubmission = () => {
    console.log(pin);
  };

  return (
    <HStack
      width={{
        base: "100%",
        md: "auto",
      }}
      spacing={4}
      justifyContent={{
        base: "space-between",
        md: "unset",
      }}
    >
      <HStack>
        <PinInput
          value={pin}
          otp={true}
          mask={isDisabled}
          isDisabled={isDisabled}
          size="md"
          focusBorderColor="wzy.300"
          onChange={(value) => setIPin(value)}
        >
          <PinInputField
            borderColor={ThemeColorModeComponents("borderColor")}
          />
          <PinInputField
            borderColor={ThemeColorModeComponents("borderColor")}
          />
          <PinInputField
            borderColor={ThemeColorModeComponents("borderColor")}
          />
          <PinInputField
            borderColor={ThemeColorModeComponents("borderColor")}
          />
        </PinInput>
      </HStack>
      <HStack spacing={2}>
        {pin.length === 4 && pin !== initialPin ? (
          <Button my="auto" onClick={handlePinSubmission} variant="unstyled">
            Save
          </Button>
        ) : (
          <Button
            onClick={() =>
              isDisabled
                ? setIsDisabled((prev) => !prev)
                : handlePinResetOrClose()
            }
            variant="unstyled"
            color={ThemeColorModeComponents("reverseBaseBg")}
          >
            {isDisabled ? "Edit" : initialPin ? "Close" : "Reset"}
          </Button>
        )}
      </HStack>
    </HStack>
  );
};
