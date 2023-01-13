import { MemberProfileCategoryInterestTag } from "@simplimods/types";

export enum BaseProfileCategories {
  OFFROAD = "Off-Road",
  STREET = "Street",
  CLASSIC = "Classic",
  MUSCLE = "Muscle",
  MOTORBIKE = "Motorbike",
}

export enum UndeclaredProfileCategories {
  NC = "No Category",
}

const ProfileInterestCategories = {
  ...BaseProfileCategories,
  ...UndeclaredProfileCategories,
};

// Combine both enums BaseProfileCategories & UndeclaredProfileCategories
type ProfileInterestCategories = typeof ProfileInterestCategories;

export type CombinedProfileCategories =
  | ProfileInterestCategories["NC"]
  | ProfileInterestCategories["MUSCLE"]
  | ProfileInterestCategories["STREET"]
  | ProfileInterestCategories["OFFROAD"]
  | ProfileInterestCategories["CLASSIC"]
  | ProfileInterestCategories["MOTORBIKE"];

export type ProfileInterestListItem = {
  categoryTag: MemberProfileCategoryInterestTag;
  colorScheme: "wzp" | "wzy" | "wzb" | "wzg";
};
