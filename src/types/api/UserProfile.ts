import { SocialMediaLinks, UserContactInformation } from "@simplimods/types";

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

export interface UserPublicProfile {
  coverImageSrc: string | null;
  avatarImageSrc: string | null;
  generalLocation?: string;
  firstName?: string;
  lastName?: string;
  username: string;
  vehicles: UserPreviewVehicles[] | null;
  events: UserPreviewEvents[] | null;
  socialMedia: SocialMediaLinks[] | null;
  contactInformation: UserContactInformation;
  memberSinceTimestamp?: number;
}

export interface UserAdminProfile {
  pin: number | null;
  zipcode: string | null;
}

export type CombineUserProfileInformation = {
  admin: UserAdminProfile;
  public: UserPublicProfile;
  uid?: string;
};
