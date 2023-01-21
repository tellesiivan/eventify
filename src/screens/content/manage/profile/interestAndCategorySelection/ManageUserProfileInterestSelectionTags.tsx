import React from "react";
import {
  MemberProfileCategoryInterestTag,
  UndeclaredProfileCategories,
} from "@simplimods/types";
import { Button, Flex } from "@chakra-ui/react";
import { ThemeColorModeComponents } from "@simplimods/theme";
import {
  selectCurrentAuthUser,
  useAppSelector,
  useGetUserAdminProfileQuery,
  useUpdateUsersProfileInterestMutation,
} from "@simplimods/redux";
import { Card, Skeleton, TextHeader } from "@simplimods/components";
import { difference, isEqual } from "lodash";
import { useCustomToast } from "@simplimods/hooks";
import { ManageUserProfileSelectionTagItem } from "@simplimods/screens";
import {
  CleanInterestTagsObjectArray,
  profileCategoryInterestArray,
} from "@simplimods/utils";

export const ManageUserProfileInterestSelectionTags = () => {
  const authUser = useAppSelector(selectCurrentAuthUser);
  const bottomBorderColor = ThemeColorModeComponents("borderColor");

  // Custom Toast Hook
  const { neutralToast, successToast, errorToast } = useCustomToast({
    position: "bottom-left",
  });

  // RTK Query: Fetch user admin profile
  const { data, isError, isLoading } = useGetUserAdminProfileQuery({
    uid: authUser.uid ? authUser.uid : "",
  });

  // RTK: Add users interest mutation
  const [updateUserInterest, { isLoading: isLoadingUpdateUserInterest }] =
    useUpdateUsersProfileInterestMutation();

  if (isError) {
    return <Skeleton h={60} />;
  }

  if (isLoading) {
    return <Skeleton h={60} />;
  }

  if (!data && !isLoading) {
    return <Skeleton h={60} />;
  }

  /**
   *  If there is any existing interest selected by the user, they will be added to this initial array
   */
  let localInterestCategoriesSelected: [] | MemberProfileCategoryInterestTag[] =
    data.userCategoryInterest.interestList
      ? data.userCategoryInterest.interestList.filter(
          (interestTag) =>
            interestTag.name !== UndeclaredProfileCategories.NC &&
            interestTag.status !== "inactive"
        )
      : [];

  /**
   * Returns a boolean by checking if the @param passed is part of the localInterestCategoriesSelected array
   * @param interestTagItem
   */
  const isProfileCategoryInterestSelected = (
    interestTagItem: MemberProfileCategoryInterestTag
  ): boolean =>
    !!localInterestCategoriesSelected.find(
      (existingInterest: MemberProfileCategoryInterestTag) =>
        existingInterest.name === interestTagItem.name &&
        existingInterest.status === "active"
    );

  /**
   * Updates localInterestCategoriesSelected array by checking if the selected interest has already been selected, if so it will be removed else will be added
   * @param interestTagItem
   * @param isSelected
   */
  const onInterestSelectionHandler = (
    interestTagItem: MemberProfileCategoryInterestTag,
    isSelected: boolean
  ) => {
    return (localInterestCategoriesSelected = isSelected
      ? localInterestCategoriesSelected.filter(
          (currentInterest: MemberProfileCategoryInterestTag) =>
            currentInterest.name !== interestTagItem.name
        )
      : [
          ...localInterestCategoriesSelected,
          { name: interestTagItem.name, status: "active" },
        ]);
  };

  const onSubmitInterestCategoriesHandler = async () => {
    const canSaveChanges =
      difference(
        localInterestCategoriesSelected,
        data.userCategoryInterest.interestList
      ).length > 0 ||
      !isEqual(
        localInterestCategoriesSelected,
        data.userCategoryInterest.interestList
      );
    if (canSaveChanges) {
      try {
        if (authUser.uid) {
          console.log(difference(localInterestCategoriesSelected));
          await updateUserInterest({
            userUid: authUser.uid,
            interestArray: CleanInterestTagsObjectArray(
              localInterestCategoriesSelected
            ),
          });
          successToast(
            "Interest",
            "You have successfully updated your interest."
          );
        }
      } catch (e) {
        errorToast("Interest", "Unable to update your interest at this time.");
      }
    } else {
      neutralToast(
        "Interest",
        "Your interest selection seems to be the same as previous selection."
      );
    }
  };

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
          title="Interest"
          description="Select and update your interests, helps us show you listings, events, and modifications related to your interest selection. "
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
            {profileCategoryInterestArray.map((interestTag) => (
              <ManageUserProfileSelectionTagItem
                tagData={interestTag}
                key={interestTag.categoryTag.name}
                isInitiallySelected={isProfileCategoryInterestSelected}
                onSelectionHandler={onInterestSelectionHandler}
              />
            ))}
          </Flex>
          <Button
            onClick={onSubmitInterestCategoriesHandler}
            rounded="full"
            variant="ghostOne"
            maxWidth="fit-content"
            ml="auto"
            mt={4}
            isLoading={isLoadingUpdateUserInterest}
          >
            Save
          </Button>
        </Flex>
      </Flex>
    </Card>
  );
};
