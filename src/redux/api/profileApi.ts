import {
  CombineUserProfileInformation,
  UserPublicProfile,
  UserSettings,
} from "@simplimods/types";
import { collection, getDocs } from "firebase/firestore";
import { firestoreDb } from "@simplimods/firebase";
import { baseApiSlice } from "@simplimods/redux/api/baseApi";

interface GetUserBy {
  user: string | undefined;
  by: "email" | "username";
}

type UserUid = {
  uid: string;
};

interface UserSettingsGraph extends UserSettings {
  internalId: string;
}

export const profileApi = baseApiSlice.injectEndpoints({
  endpoints: (build) => ({
    getUserPublicProfile: build.query<UserPublicProfile, UserUid>({
      async queryFn({ uid }): Promise<any> {
        try {
          let queryData;
          const userPublicProfileRef = collection(
            firestoreDb,
            "memberGraph",
            uid,
            "profile"
          );
          const querySnapshot = await getDocs(userPublicProfileRef);
          querySnapshot.forEach((doc): UserPublicProfile => {
            const combinedProfileData =
              doc.data() as CombineUserProfileInformation;
            return (queryData = combinedProfileData.public);
          });
          return {
            data: queryData,
          };
        } catch (error) {
          return error;
        }
      },
      providesTags: ["Membergraph"],
    }),
    getUserCombineProfileInformation: build.query<
      CombineUserProfileInformation,
      UserUid
    >({
      async queryFn({ uid }): Promise<any> {
        try {
          let queryData;
          const userPublicProfileRef = collection(
            firestoreDb,
            "memberGraph",
            uid,
            "profile"
          );
          const querySnapshot = await getDocs(userPublicProfileRef);
          querySnapshot.forEach((doc): CombineUserProfileInformation => {
            const combinedProfileData =
              doc.data() as CombineUserProfileInformation;
            return (queryData = {
              ...combinedProfileData,
              uid: doc.id,
            });
          });
          return {
            data: queryData,
          };
        } catch (error) {
          return error;
        }
      },
      providesTags: ["Membergraph"],
    }),
  }),
});
export const {
  useGetUserPublicProfileQuery,
  useGetUserCombineProfileInformationQuery,
} = profileApi;
