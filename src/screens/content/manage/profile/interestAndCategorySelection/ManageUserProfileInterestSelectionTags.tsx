import React from "react";
import {
  MemberProfileCategoryInterestTag,
  ProfileInterestListItem,
} from "@simplimods/types";
import { Button, Flex } from "@chakra-ui/react";
import { ThemeColorModeComponents } from "@simplimods/theme";
import {
  selectCurrentAuthUser,
  useAppSelector,
  useGetUserAdminProfileQuery,
} from "@simplimods/redux";
import { Card, Skeleton, TextHeader } from "@simplimods/components";
import { difference, isEqual } from "lodash";
import { useCustomToast } from "@simplimods/hooks";
import { ManageUserProfileSelectionTagItem } from "@simplimods/screens";

interface ManageUserProfileInterestSelectionTagsProps {
  categoryInterestArray: ProfileInterestListItem[];
}

export const ManageUserProfileInterestSelectionTags = ({
                                                           categoryInterestArray,
                                                       }: ManageUserProfileInterestSelectionTagsProps) => {
    const authUser = useAppSelector(selectCurrentAuthUser);
    const bottomBorderColor = ThemeColorModeComponents("borderColor");

    // Custom Toast Hook
    const {neutralToast} = useCustomToast({position: "bottom-left"});

    // RTK Query
    const {data, isError, isLoading} = useGetUserAdminProfileQuery({
        uid: authUser.uid ? authUser.uid : "",
    });

    if (isError) {
        return <Skeleton h={60}/>;
    }

    if (isLoading) {
        return <Skeleton h={60}/>;
    }

    if (!data && !isLoading) {
        return <Skeleton h={60}/>;
    }

    const defaultCategoryInterestArray = categoryInterestArray.flatMap(
        (interestTag): MemberProfileCategoryInterestTag[] => {
            let categoryInterestTagArray: MemberProfileCategoryInterestTag[] | [] =
                [];

            categoryInterestTagArray = [
                ...categoryInterestTagArray,
                interestTag.categoryTag,
            ];

            return categoryInterestTagArray;
        }
    );

    /**
     *  If there is any existing interest selected by the user, they will be added to this initial array
     */
    let localInterestCategoriesSelected: [] | MemberProfileCategoryInterestTag[] =
        data.userCategoryInterest.interestList
            ? data.userCategoryInterest.interestList
            : [];

    /**
     * Returns a boolean by checking if the @param passed is part of the localInterestCategoriesSelected array
     * @param interestTagItem
     */
    const isProfileCategoryInterestSelected = (
        interestTagItem: MemberProfileCategoryInterestTag
    ): boolean =>
        !!localInterestCategoriesSelected.find(
            (existingInterest: MemberProfileCategoryInterestTag) => (
                existingInterest.name === interestTagItem.name &&
                existingInterest.status === "active"
            )
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
                {name: interestTagItem.name, status: "active"},
            ]);
    };

    const onSubmitInterestCategoriesHandler = () => {
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
            console.log(
                difference(
                    localInterestCategoriesSelected,
                    defaultCategoryInterestArray
                )
            );
            console.log("Can save changes", localInterestCategoriesSelected);
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
                    mb={{base: 4}}
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
                        pb={{base: 8, lg: 6}}
                        borderBottom="1px"
                        borderColor={bottomBorderColor}
                    >
                        {categoryInterestArray.map((interestTag) => (
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
