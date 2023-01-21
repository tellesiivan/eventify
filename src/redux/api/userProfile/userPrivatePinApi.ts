import { baseApiSlice } from "@simplimods/redux/api/baseApi";
import { userProfile, userSettings } from "@simplimods/types";
import { doc, updateDoc } from "firebase/firestore";

export const userPrivatePinApi = baseApiSlice.injectEndpoints({
  endpoints: (build) => ({
    updateUsersPrivatePin: build.mutation<
      string,
      {
        userUid: string;
        privatePin: number;
        hasPin: boolean;
      }
    >({
      async queryFn({ userUid, privatePin, hasPin }): Promise<any> {
        const userProfileRef = doc(
          userProfile,
          `/${userUid}/profile/${userUid}`
        );
        const userSettingsRef = doc(
          userSettings,
          `/${userUid}/settings/${userUid}`
        );
        try {
          // Updates users private pin
          await updateDoc(userProfileRef, {
            // @ts-ignore
            "admin.pin": privatePin,
          });
          // Updates users hasPin setting
          await updateDoc(userSettingsRef, {
            // @ts-ignore
            hasPin,
          });
          return "success";
        } catch (err) {
          return { error: err };
        }
      },
      invalidatesTags: ["MemberGraph"],
    }),
  }),
});
export const { useUpdateUsersPrivatePinMutation } = userPrivatePinApi;
