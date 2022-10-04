import { Button } from "@chakra-ui/react";

type ButtonIconProps = {
  Icon: React.ReactElement;
  Text: string;
  isLoading?: boolean;
  onClickAction?: () => void;
};

/**
 * Simple button with an icon and text property that an action will be performed onClick
 * @param Icon needs to be passed from react-icons
 * @param Text a string that will be displayed inside the button
 */
const ButtonIcon = ({
  Icon,
  Text,
  isLoading = true,
  onClickAction,
}: ButtonIconProps) => {
  return (
    <Button
      alignItems="center"
      display="flex"
      leftIcon={Icon}
      onClick={onClickAction}
      isLoading={isLoading}
      colorScheme="teal"
      variant="unstyled"
      width="full"
      p={2}
      height="12"
      rounded="xl"
      bg="black"
      fontSize="sm"
      color="white"
      iconSpacing="6"
    >
      {Text}
    </Button>
  );
};

export default ButtonIcon;
