import React, { useState } from "react";
import { Card, TextHeader } from "@simplimods/components";
import { Button, Flex, Tag, TagCloseButton, TagLabel } from "@chakra-ui/react";
import {
  CombinedProfileCategories,
  MemberProfileCategoryInterestTag,
  ProfileInterestListItem,
  UndeclaredProfileCategories,
} from "@simplimods/types";
import { ThemeColorModeComponents } from "@simplimods/theme";
import { useCustomToast } from "@simplimods/hooks";

interface ManageUserProfileCategorySelectionProps {
  currentProfileCategory: MemberProfileCategoryInterestTag;
  profileCategoriesArray: ProfileInterestListItem[];
}

export const ManageUserProfileCategorySelection = ({
  currentProfileCategory,
  profileCategoriesArray,
}: ManageUserProfileCategorySelectionProps) => {
  const bottomBorderColor = ThemeColorModeComponents("borderColor");
  const activeTagBg = ThemeColorModeComponents("accentThemeBgDos");
  const activeTagColor = ThemeColorModeComponents("reverseBaseBg");

  // Custom Toast Hook
  const { neutralToast } = useCustomToast({ position: "bottom-left" });

  const hasNoCategory =
    currentProfileCategory.name === UndeclaredProfileCategories.NC;

  const [selectedCategory, setSelectedCategory] =
    useState<MemberProfileCategoryInterestTag | null>(
      hasNoCategory ? null : currentProfileCategory
    );

  const isCategoryInitiallySelected = (
    categoryTag: MemberProfileCategoryInterestTag
  ): boolean => currentProfileCategory.name === categoryTag.name;

  const onCategoryTagSelectionHandler = (
    categoryTag: MemberProfileCategoryInterestTag,
    isSelected: boolean
  ) => {
    setSelectedCategory({ name: categoryTag.name, status: "active" });
  };

  const onSaveProfileCategoryHandler = () => {
    console.log(selectedCategory);
  };

  // checkd if tag is already selected
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
            {profileCategoriesArray.map((category) => (
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
                <TagLabel>{category.categoryTag.name}</TagLabel>
                {isSelected(category.categoryTag.name) && <TagCloseButton />}
              </Tag>
            ))}
          </Flex>
          <Button
            isDisabled={
              selectedCategory
                ? isCategoryInitiallySelected(
                    selectedCategory || currentProfileCategory
                  )
                : false
            }
            onClick={onSaveProfileCategoryHandler}
            rounded="full"
            variant="ghost"
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
