import {
  CombineUserProfileInformation,
  UserAdminProfile,
  UserPublicProfile,
} from "@simplimods/types";
import { collection, getDocs } from "firebase/firestore";
import { firestoreDb } from "@simplimods/firebase";
import { baseApiSlice } from "@simplimods/redux/api/baseApi";

type UserUid = {
  uid: string;
};

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
      providesTags: ["MemberGraph"],
    }),
    getUserAdminProfile: build.query<UserAdminProfile, UserUid>({
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
          querySnapshot.forEach((doc): UserAdminProfile => {
            const combinedProfileData =
              doc.data() as CombineUserProfileInformation;
            return (queryData = combinedProfileData.admin);
          });
          return {
            data: queryData,
          };
        } catch (error) {
          return error;
        }
      },
      providesTags: ["MemberGraph"],
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
      providesTags: ["MemberGraph"],
    }),
  }),
});
export const {
  useGetUserPublicProfileQuery,
  useGetUserCombineProfileInformationQuery,
  useLazyGetUserAdminProfileQuery,
  useGetUserAdminProfileQuery,
} = profileApi;
