import {BaseProfileCategories, MemberProfileCategoryInterestTag, ProfileInterestListItem,} from "@simplimods/types";

/** @param selectedInterestTagsArray is required, an array of selected interest tags
 * @returns A clean interest tags array with the selected interests and the remaining default tags(status:'inactive');
 * */
export const CleanInterestTagsObjectArray = (
  selectedInterestTagsArray: MemberProfileCategoryInterestTag[]
): MemberProfileCategoryInterestTag[] => {
  const selectedInterestKeysSet = new Set(
    [...selectedInterestTagsArray].map((item) => item.name)
  );
  const remainingDefaultCategories = defaultCategoryInterestArray.filter(
    (defaultItem) => !selectedInterestKeysSet.has(defaultItem.name)
  );

  console.log("selectedInterestKeysSet", selectedInterestKeysSet);

  return [...selectedInterestTagsArray, ...remainingDefaultCategories];
};

/** Array that contains possible profile interest(multiple) or categories(single) */
export const profileCategoryInterestArray: ProfileInterestListItem[] = [
  {
    categoryTag: { name: BaseProfileCategories.CLASSIC, status: "inactive" },
    colorScheme: "wzb",
  },
  {
    categoryTag: { name: BaseProfileCategories.STREET, status: "inactive" },
    colorScheme: "wzy",
  },
  {
    categoryTag: { name: BaseProfileCategories.OFFROAD, status: "inactive" },
    colorScheme: "wzp",
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
    colorScheme: "warning",
  },
];

/** Returns a default a clean profileCategoryInterestArray array without the colorScheme */
export const defaultCategoryInterestArray =
  profileCategoryInterestArray.flatMap(
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
