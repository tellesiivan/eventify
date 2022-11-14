import { Box, StackDivider, VStack } from "@chakra-ui/react";

// tslint:disable-next-line
interface ManageActionsProps {}

export const ManageActions = (props: ManageActionsProps) => {
  return (
    <Box>
      <VStack
        divider={<StackDivider borderColor="gray.200" />}
        spacing={4}
        align="stretch"
      >
        <Box h="40px" bg="secondary.100">
          1
        </Box>
        <Box h="40px" bg="secondary.100">
          2
        </Box>
        <Box h="40px" bg="secondary.100">
          3
        </Box>
      </VStack>
    </Box>
  );
};

export default ManageActions;
