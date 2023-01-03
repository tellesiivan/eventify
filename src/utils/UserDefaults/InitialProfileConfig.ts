import { UserAdminProfile, UserPublicProfile } from "@simplimods/types";

export const InitialPublicProfileConfig: UserPublicProfile = {
  coverImageSrc: null,
  avatarImageSrc: null,
  vehicles: null,
  events: null,
  socialMedia: null,
  username: "",
  contactInformation:{
    phoneNumber:null,
    email:null
  }
};
export const InitialAdminProfileConfig: UserAdminProfile = {
  pin: null,
  zipcode: null,
};
