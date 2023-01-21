import {
  ForSalePartsPreview,
  MemberProfileCategoryInterestTag,
  SocialMediaLinks,
  UserContactInformation,
  UserLocation,
} from "@simplimods/types";
import { UserInterestCategories } from "@simplimods/types/api/UserInterestCategories";

export interface UserPreviewEvents {
  eventId: number;
  title: string;
  date: string | Date;
}

export interface UserPreviewVehicles {
  vehicleCoverImgUrl: string;
  vehicleId: number;
  title: string;
  modificationCount: number;
}

export interface UserProfileOverview {
  profileAvatarSrc: string;
  username: string;
  vehicleCount: number;
}

export interface UserFollowing extends UserProfileOverview {
  type: "Follower" | "Following";
}

export interface UserProfileSourceReference {
  bucketReference: string;
  path: string;
  type: "avatar" | "coverImage";
}

export interface UserPublicProfile {
  avatarImageSrc: string | null;
  contactInformation: UserContactInformation;
  coverImageSrc: string | null;
  events: UserPreviewEvents[] | null;
  firstName?: string;
  followersAndFollowing: UserFollowing[] | null;
  lastName?: string;
  location: UserLocation;
  memberSinceTimestamp: number | null;
  partsForSale: ForSalePartsPreview[] | null;
  profileCategory: MemberProfileCategoryInterestTag;
  socialMedia: SocialMediaLinks[] | null;
  username: string;
  vehicles: UserPreviewVehicles[] | null;
}

export interface UserAdminProfile {
  pin: number | null;
  assetsReference: UserProfileSourceReference[] | [];
  userCategoryInterest: UserInterestCategories;
}

export type CombineUserProfileInformation = {
  admin: UserAdminProfile;
  public: UserPublicProfile;
  uid?: string;
};
