import {
  SocialMediaLinks,
  UserContactInformation,
  UserLocation,
} from "@simplimods/types";

export interface UserPreviewEvents {
  eventId: number;
  title: string;
  date: string | Date;
}

export interface UserPreviewVehicles {
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
  memberSinceTimestamp?: number;
}

export interface UserAdminProfile {
  pin: number | null;
}

export type CombineUserProfileInformation = {
  admin: UserAdminProfile;
  public: UserPublicProfile;
  uid?: string;
};
