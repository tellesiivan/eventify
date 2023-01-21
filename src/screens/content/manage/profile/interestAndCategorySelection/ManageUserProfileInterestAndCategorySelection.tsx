import React from "react";
import { VStack } from "@chakra-ui/react";
import {
  ManageUserProfileCategorySelection,
  ManageUserProfileInterestSelectionTags,
} from "@simplimods/screens";
import { MemberProfileCategoryInterestTag } from "@simplimods/types";

interface ManageUserProfileInterestAndCategorySelectionProps {
  currentProfileCategory: MemberProfileCategoryInterestTag;
}

export const ManageUserProfileInterestAndCategorySelection = ({
  currentProfileCategory,
}: ManageUserProfileInterestAndCategorySelectionProps) => {
  return (
    <VStack width="full" spacing={3}>
      <ManageUserProfileCategorySelection
        currentProfileCategory={currentProfileCategory}
      />
      <ManageUserProfileInterestSelectionTags />
    </VStack>
  );
};
