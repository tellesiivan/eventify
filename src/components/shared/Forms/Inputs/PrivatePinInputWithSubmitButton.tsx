import { Button, HStack, PinInput, PinInputField } from "@chakra-ui/react";
import {
  selectCurrentAuthUserUid,
  useAppSelector,
  useUpdateUsersPrivatePinMutation,
} from "@simplimods/redux";
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

  // RTK: User Private Pin mutation
  const [addUsersPrivatePin, { isLoading, isError }] =
    useUpdateUsersPrivatePinMutation();

  // selectors
  const userUid = useAppSelector(selectCurrentAuthUserUid);

  const handlePinResetOrClose = () => {
    if (initialPin) {
      setIPin(initialPin);
    } else {
      setIPin("");
    }
    setIsDisabled(true);
  };
  const handlePinSubmission = async () => {
    try {
      await addUsersPrivatePin({
        userUid: userUid ?? "",
        privatePin: Number(pin),
        hasPin: true,
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <HStack
      width={{
        base: "100%",
        lg: "auto",
      }}
      spacing={4}
      justifyContent={{
        base: "space-between",
        lg: "unset",
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
          <Button
            my="auto"
            onClick={handlePinSubmission}
            variant="ghostOne"
            isLoading={isLoading}
          >
            Save
          </Button>
        ) : (
          <Button
            onClick={() =>
              isDisabled
                ? setIsDisabled((prev) => !prev)
                : handlePinResetOrClose()
            }
            variant="ghostOne"
            color={ThemeColorModeComponents("reverseBaseBg")}
          >
            {isDisabled ? "Edit" : initialPin ? "Close" : "Reset"}
          </Button>
        )}
      </HStack>
    </HStack>
  );
};
