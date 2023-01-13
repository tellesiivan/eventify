import { ThemeColorModeComponents } from "@simplimods/theme";
import React, { useState } from "react";
import { Tag, TagCloseButton, TagLabel } from "@chakra-ui/react";
import {
  MemberProfileCategoryInterestTag,
  ProfileInterestListItem,
} from "@simplimods/types";

interface ManageUserProfileSelectionTagItemProps {
  tagData: ProfileInterestListItem;

  isInitiallySelected: (
    interestListItem: MemberProfileCategoryInterestTag
  ) => boolean;
  onSelectionHandler: (
    tagSelected: MemberProfileCategoryInterestTag,
    isSelected: boolean
  ) => void;
}

export const ManageUserProfileSelectionTagItem = ({
  tagData,
  isInitiallySelected,
  onSelectionHandler,
}: ManageUserProfileSelectionTagItemProps) => {
  const activeTagBg = ThemeColorModeComponents("accentThemeBgDos");
  const activeTagColor = ThemeColorModeComponents("reverseBaseBg");

  const [isSelected, setIsSelected] = useState<boolean>(
    isInitiallySelected(tagData.categoryTag)
  );
  return (
    <Tag
      _hover={{
        opacity: 0.8,
      }}
      cursor="pointer"
      size="lg"
      rounded="full"
      variant="clickable"
      key={tagData.categoryTag.name}
      mt={2}
      fontSize="sm"
      mr={2}
      onClick={() => {
        setIsSelected((prev) => !prev);
        onSelectionHandler(tagData.categoryTag, isSelected);
      }}
      backgroundColor={isSelected ? `${tagData.colorScheme}.100` : activeTagBg}
      color={isSelected ? `${tagData.colorScheme}.900` : activeTagColor}
    >
      <TagLabel>{tagData.categoryTag.name}</TagLabel>
      {isSelected && <TagCloseButton />}
    </Tag>
  );
};
