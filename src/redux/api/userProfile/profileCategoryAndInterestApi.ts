import { baseApiSlice } from "@simplimods/redux/api/baseApi";
import {
  MemberProfileCategoryInterestTag,
  userProfile,
} from "@simplimods/types";
import { doc, updateDoc } from "firebase/firestore";

export const profileCategoryAndInterestApi = baseApiSlice.injectEndpoints({
  endpoints: (build) => ({
    updateUsersProfileCategory: build.mutation<
      string,
      {
        userUid: string;
        category: MemberProfileCategoryInterestTag;
      }
    >({
      async queryFn({ userUid, category }): Promise<any> {
        let data: string = "";
        const userProfileRef = doc(
          userProfile,
          `/${userUid}/profile/${userUid}`
        );

        try {
          await updateDoc(userProfileRef, {
            // @ts-ignore
            "public.profileCategory": category,
          });
          data = "success";

          return data;
        } catch (err) {
          return { error: err };
        }
      },
      invalidatesTags: ["MemberGraph"],
    }),
    updateUsersProfileInterest: build.mutation<
      "success" | "error",
      {
        userUid: string;
        interestArray: MemberProfileCategoryInterestTag[];
      }
    >({
      async queryFn({
        userUid,
        interestArray,
      }): Promise<"success" | "error" | any> {
        const userProfileRef = doc(
          userProfile,
          `/${userUid}/profile/${userUid}`
        );
        try {
          await updateDoc(userProfileRef, {
            // @ts-ignore
            "admin.userCategoryInterest.interestList": interestArray,
          });

          return "success";
        } catch (err) {
          return "error";
        }
      },
      invalidatesTags: ["MemberGraph"],
    }),
  }),
  overrideExisting: false,
});
export const {
  useUpdateUsersProfileCategoryMutation,
  useUpdateUsersProfileInterestMutation,
} = profileCategoryAndInterestApi;
