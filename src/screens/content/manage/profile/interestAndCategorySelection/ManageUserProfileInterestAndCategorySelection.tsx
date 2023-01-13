import React from "react";
import { VStack } from "@chakra-ui/react";
import {
  ManageUserProfileCategorySelection,
  ManageUserProfileInterestSelectionTags,
} from "@simplimods/screens";
import {
  BaseProfileCategories,
  MemberProfileCategoryInterestTag,
  ProfileInterestListItem,
} from "@simplimods/types";

interface ManageUserProfileInterestAndCategorySelectionProps {
  currentProfileCategory: MemberProfileCategoryInterestTag;
}

export const ManageUserProfileInterestAndCategorySelection = ({
  currentProfileCategory,
}: ManageUserProfileInterestAndCategorySelectionProps) => {
  /** Array that contains possible profile interest(multiple) or categories(single) */
  const profileCategoryInterestArray: ProfileInterestListItem[] = [
    {
      categoryTag: { name: BaseProfileCategories.CLASSIC, status: "inactive" },
      colorScheme: "wzb",
    },
    {
      categoryTag: { name: BaseProfileCategories.STREET, status: "inactive" },
      colorScheme: "wzp",
    },
    {
      categoryTag: { name: BaseProfileCategories.OFFROAD, status: "inactive" },
      colorScheme: "wzy",
    },
    {
      categoryTag: {
        name: BaseProfileCategories.MOTORBIKE,
        status: "inactive",
      },
      colorScheme: "wzg",
    },
    {
      categoryTag: { name: BaseProfileCategories.MUSCLE, status: "inactive" },
      colorScheme: "wzp",
    },
  ];

  return (
    <VStack width="full" spacing={4}>
      <ManageUserProfileCategorySelection
        currentProfileCategory={currentProfileCategory}
        profileCategoriesArray={profileCategoryInterestArray}
      />
      <ManageUserProfileInterestSelectionTags
        categoryInterestArray={profileCategoryInterestArray}
      />
    </VStack>
  );
};
