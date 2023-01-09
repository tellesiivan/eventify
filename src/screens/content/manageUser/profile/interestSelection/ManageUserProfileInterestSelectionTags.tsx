import React, { useState } from "react";
import {
  BaseProfileCategories,
  ProfileInterestListItem,
} from "@simplimods/types";
import { Flex, Tag, TagCloseButton, TagLabel } from "@chakra-ui/react";
import { ThemeColorModeComponents } from "@simplimods/theme";
import {
  selectCurrentAuthUser,
  useAppSelector,
  useGetUserAdminProfileQuery,
} from "@simplimods/redux";

export const ManageUserProfileInterestSelectionTags = () => {
  const authUser = useAppSelector(selectCurrentAuthUser);

  const { data, isError, isLoading } = useGetUserAdminProfileQuery({
    uid: authUser.uid ?? "",
  });

  const userExistingInterestCategories =
    data && data.userCategoryInterest.interestList;

  let localInterestCategoriesSelected: [] | BaseProfileCategories[] =
    userExistingInterestCategories ? userExistingInterestCategories : [];

  const isProfileCategoryInterestSelected = (
    interestListItem: BaseProfileCategories
  ) =>
    !!localInterestCategoriesSelected.find(
      (existingInterest) => existingInterest === interestListItem
    );

  const onInterestSelectionHandler = (
    interest: BaseProfileCategories,
    isSelected: boolean
  ) => {
    localInterestCategoriesSelected = isSelected
      ? localInterestCategoriesSelected.filter(
          (currentInterest) => currentInterest !== interest
        )
      : [...localInterestCategoriesSelected, interest];

    console.log(localInterestCategoriesSelected, interest, isSelected);
  };

  const profileInterestArray: ProfileInterestListItem[] = [
    {
      interestName: BaseProfileCategories.CLASSIC,
      colorScheme: "wzb",
      onSelectionHandler: onInterestSelectionHandler,
      isSelected: isProfileCategoryInterestSelected(
        BaseProfileCategories.CLASSIC
      ),
    },
    {
      interestName: BaseProfileCategories.STREET,
      colorScheme: "wzp",
      onSelectionHandler: onInterestSelectionHandler,
      isSelected: isProfileCategoryInterestSelected(
        BaseProfileCategories.STREET
      ),
    },
    {
      interestName: BaseProfileCategories.OFFROAD,
      colorScheme: "wzy",
      onSelectionHandler: onInterestSelectionHandler,
      isSelected: isProfileCategoryInterestSelected(
        BaseProfileCategories.OFFROAD
      ),
    },
    {
      interestName: BaseProfileCategories.MOTORBIKE,
      colorScheme: "wzg",
      onSelectionHandler: onInterestSelectionHandler,
      isSelected: isProfileCategoryInterestSelected(
        BaseProfileCategories.MOTORBIKE
      ),
    },
    {
      interestName: BaseProfileCategories.MUSCLE,
      colorScheme: "wzp",
      onSelectionHandler: onInterestSelectionHandler,
      isSelected: isProfileCategoryInterestSelected(
        BaseProfileCategories.CLASSIC
      ),
    },
  ];

  return (
    <Flex flexWrap="wrap">
      {profileInterestArray.map((interestTag) => (
        <ManageUserProfileInterestSelectionTag
          interestTag={interestTag}
          key={interestTag.interestName}
        />
      ))}
    </Flex>
  );
};

interface ManageUserProfileInterestSelectionTag {
  interestTag: ProfileInterestListItem;
}

const ManageUserProfileInterestSelectionTag = ({
  interestTag,
}: ManageUserProfileInterestSelectionTag) => {
  const [isSelected, setIsSelected] = useState<boolean>(interestTag.isSelected);

  return (
    <Tag
      _hover={{
        opacity: 0.8,
      }}
      cursor="pointer"
      size="lg"
      rounded="full"
      variant="clickable"
      key={interestTag.interestName}
      mt={2}
      fontSize="sm"
      mr={2}
      onClick={() => {
        interestTag.onSelectionHandler(interestTag.interestName, isSelected);
        setIsSelected(!isSelected);
      }}
      backgroundColor={
        isSelected
          ? `${interestTag.colorScheme}.800`
          : ThemeColorModeComponents("accentThemeBgDos")
      }
      color={
        isSelected
          ? `${interestTag.colorScheme}.100`
          : ThemeColorModeComponents("reverseBaseBg")
      }
    >
      <TagLabel>{interestTag.interestName}</TagLabel>
      {isSelected && <TagCloseButton />}
    </Tag>
  );
};
