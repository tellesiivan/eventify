import type { InputGroupProps } from "@chakra-ui/react";
import { Button, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { ThemeColorModeComponents } from "@simplimods/theme";
import React from "react";

interface InputWithSubmitButtonProps extends InputGroupProps {
  placeholder: string;
  isLoading?: boolean;
  onSubmitClick: () => void;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  inputValue: string;
  inputType?: "text" | "number";
  minInputLength?: 3 | 5 | 8;
}

export const InputWithSubmitButton = ({
  placeholder,
  isLoading = false,
  onSubmitClick,
  setInputValue,
  inputValue,
  inputType = "text",
  minInputLength = 5,
  ...props
}: InputWithSubmitButtonProps) => {
  return (
    <InputGroup
      maxWidth={{
        base: "full",
        lg: 96,
      }}
      py={2}
      bg={ThemeColorModeComponents("accentThemeBgDos")}
      rounded="xl"
      display="flex"
      alignItems="center"
    >
      <Input
        type={inputType}
        placeholder={placeholder}
        _placeholder={{
          fontSize: "sm",
        }}
        border="none"
        borderColor="transparent"
        outline="none"
        outlineColor="transparent"
        _focusVisible={{
          outline: "0",
          border: "none",
        }}
        bg="transparent"
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
        {...props}
      />
      <InputRightElement
        h="full"
        mr={isLoading ? 0 : 6}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Button
          onClick={onSubmitClick}
          isDisabled={inputValue.trim().length < minInputLength}
          isLoading={isLoading}
          variant="unstyled"
          fontSize="sm"
          my="auto"
          cursor="pointer"
          minWidth={isLoading ? 0 : 24}
        >
          Submit
        </Button>
      </InputRightElement>
    </InputGroup>
  );
};

export default InputWithSubmitButton;
