import {
  CombinedProfileCategories,
  ForSalePartsPreview,
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

export interface UserPublicProfile {
  coverImageSrc: string | null;
  avatarImageSrc: string | null;
  location: UserLocation;
  firstName?: string;
  lastName?: string;
  username: string;
  vehicles: UserPreviewVehicles[] | null;
  events: UserPreviewEvents[] | null;
  socialMedia: SocialMediaLinks[] | null;
  followersAndFollowing: UserFollowing[] | null;
  contactInformation: UserContactInformation;
  partsForSale: ForSalePartsPreview[] | null;
  profileCategory: CombinedProfileCategories;
  memberSinceTimestamp: number | null;
}

export interface UserAdminProfile {
  pin: number | null;
  userCategoryInterest: UserInterestCategories;
}

export type CombineUserProfileInformation = {
  admin: UserAdminProfile;
  public: UserPublicProfile;
  uid?: string;
};
