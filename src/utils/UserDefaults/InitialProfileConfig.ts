import {
  UndeclaredProfileCategories,
  UserAdminProfile,
  UserPublicProfile,
} from "@simplimods/types";

export const InitialPublicProfileConfig: UserPublicProfile = {
  coverImageSrc: null,
  avatarImageSrc: null,
  vehicles: null,
  events: null,
  followersAndFollowing: null,
  socialMedia: null,
  username: "",
  partsForSale: null,
  memberSinceTimestamp: null,
  profileCategory: {
    name: UndeclaredProfileCategories.NC,
    status: "inactive",
  },
  contactInformation: {
    phoneNumber: null,
    email: null,
  },
  location: {
    zipcode: null,
    lat: null,
    long: null,
  },
};
export const InitialAdminProfileConfig: UserAdminProfile = {
  pin: null,
  assetsReference: [],
  userCategoryInterest: {
    interestList: [],
  },
};
