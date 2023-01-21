import React, { useState } from "react";
import { Card, TextHeader } from "@simplimods/components";
import { Avatar, Button, Flex, Tag, TagLabel } from "@chakra-ui/react";
import {
  CombinedProfileCategories,
  MemberProfileCategoryInterestTag,
  UndeclaredProfileCategories,
} from "@simplimods/types";
import { ThemeColorModeComponents } from "@simplimods/theme";
import { useCustomToast } from "@simplimods/hooks";
import { profileCategoryInterestArray } from "@simplimods/utils";
import {
  selectCurrentAuthUserUid,
  useAppSelector,
  useUpdateUsersProfileCategoryMutation,
} from "@simplimods/redux";

interface ManageUserProfileCategorySelectionProps {
  currentProfileCategory: MemberProfileCategoryInterestTag;
}

export const ManageUserProfileCategorySelection = ({
  currentProfileCategory,
}: ManageUserProfileCategorySelectionProps) => {
  const bottomBorderColor = ThemeColorModeComponents("borderColor");
  const activeTagBg = ThemeColorModeComponents("accentThemeBgDos");
  const activeTagColor = ThemeColorModeComponents("reverseBaseBg");

  const userUid = useAppSelector(selectCurrentAuthUserUid);

  // Custom Toast Hook
  const { successToast, errorToast } = useCustomToast({
    position: "bottom-left",
  });

  // RTK: Update users profile category
  const [updateUsersProfileCategory, { isLoading, isError }] =
    useUpdateUsersProfileCategoryMutation();

  // check if profile category is set to UndeclaredProfileCategories.NC {{ No Category }}
  const hasNoCategory =
    currentProfileCategory.name === UndeclaredProfileCategories.NC;

  // Local State
  const [selectedCategory, setSelectedCategory] =
    useState<MemberProfileCategoryInterestTag | null>(
      hasNoCategory ? null : currentProfileCategory
    );

  /** Checks if initial profile category matches any existing categories */
  const isCategoryInitiallySelected = (
    categoryTag: MemberProfileCategoryInterestTag
  ): boolean => currentProfileCategory.name === categoryTag.name;

  // Update local state on profile category selection
  const onCategoryTagSelectionHandler = (
    categoryTag: MemberProfileCategoryInterestTag,
    isSelected: boolean
  ) => {
    setSelectedCategory({ name: categoryTag.name, status: "active" });
  };

  // Submits category
  const saveProfileCategoryHandler = async () => {
    try {
      if (selectedCategory && userUid) {
        await updateUsersProfileCategory({
          category: selectedCategory,
          userUid: userUid,
        });
      }
      successToast(
        "Profile Category",
        `You have updated your profile category to ${selectedCategory?.name}`
      );
    } catch (e) {
      console.log("error", e);
      errorToast(
        "Profile Category",
        `Unable to update your profile category at this time.`
      );
    }
  };
  // checks if profile category tag is already selected
  const isSelected = (profileCategoryName: CombinedProfileCategories) =>
    selectedCategory?.name === profileCategoryName;

  return (
    <Card
      width="full"
      rounded="md"
      p={{
        base: 4,
        md: 6,
      }}
    >
      <Flex flexDirection="column" width="full">
        <TextHeader
          maxWidth={{
            base: "full",
            lg: "96",
          }}
          my={2}
          title="Your Profile Category"
          description={
            hasNoCategory
              ? "Seems like you have not selected a profile category, choose one of the available options below to help other car enthusiast find you."
              : "Here you can update your profile category, maybe a category that you're interested in or a category that best matches your vehicles."
          }
          mb={{ base: 4 }}
        />
        <Flex
          flexWrap="wrap"
          justifyContent={{
            base: "unset",
            lg: "space-between",
          }}
          flexDirection={{
            base: "column",
            lg: "row",
          }}
          alignItems="center"
        >
          <Flex
            width="full"
            flexWrap="wrap"
            pb={{ base: 8, lg: 6 }}
            borderBottom="1px"
            borderColor={bottomBorderColor}
          >
            {profileCategoryInterestArray.map((category) => (
              <Tag
                _hover={{
                  opacity: 0.8,
                }}
                cursor="pointer"
                size="lg"
                rounded="full"
                variant="clickable"
                key={category.categoryTag.name}
                mt={2}
                fontSize="sm"
                mr={2}
                onClick={() =>
                  onCategoryTagSelectionHandler(
                    category.categoryTag,
                    isSelected(category.categoryTag.name)
                  )
                }
                backgroundColor={
                  isSelected(category.categoryTag.name)
                    ? `${category.colorScheme}.100`
                    : activeTagBg
                }
                color={
                  isSelected(category.categoryTag.name)
                    ? `${category.colorScheme}.900`
                    : activeTagColor
                }
              >
                {isSelected(category.categoryTag.name) && (
                  <Avatar
                    backgroundColor={`${category.colorScheme}.50`}
                    color={"secondary.900"}
                    mr={1.5}
                    variant="nameBase"
                    ml={-2}
                    size="xs"
                    name={category.categoryTag.name}
                  />
                )}
                <TagLabel>{category.categoryTag.name}</TagLabel>
              </Tag>
            ))}
          </Flex>
          <Button
            isDisabled={
              hasNoCategory || selectedCategory
                ? isCategoryInitiallySelected(
                    selectedCategory || currentProfileCategory
                  )
                : false
            }
            isLoading={isLoading}
            onClick={saveProfileCategoryHandler}
            rounded="full"
            variant="ghostOne"
            maxWidth="fit-content"
            ml="auto"
            mt={4}
          >
            Save
          </Button>
        </Flex>
      </Flex>
    </Card>
  );
};
