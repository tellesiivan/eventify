import { Text, VStack } from "@chakra-ui/react";
import React from "react";
import { UserBackgroundCoverImage } from "../../../layout";

interface ManagerUserProfileContentProps {}

export const ManagerUserProfileContent = (
  props: ManagerUserProfileContentProps
) => {
  return (
    <VStack p={2} width="full">
      {/* ==== USER PROFILE BG IMAGE ==== */}
      <Text as="h2" variant="h2sb" textAlign="start" mr="auto">
        Basic Info.
      </Text>
      <UserBackgroundCoverImage canManage={true} />
    </VStack>
  );
};

export default ManagerUserProfileContent;
