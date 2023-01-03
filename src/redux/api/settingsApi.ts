import { UserSettings } from "@simplimods/types";
import { collection, getDocs } from "firebase/firestore";
import { firestoreDb } from "../../firebase/firebase.config";
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

export const settingsApi = baseApiSlice.injectEndpoints({
  endpoints: (build) => ({
    getUserSettings: build.query<UserSettingsGraph, UserUid>({
      async queryFn({ uid }): Promise<any> {
        try {
          let queryData;
          const userSettingsRef = collection(
            firestoreDb,
            "memberGraph",
            uid,
            "settings"
          );
          const querySnapshot = await getDocs(userSettingsRef);
          querySnapshot.forEach((doc): UserSettingsGraph => {
            return (queryData = {
              internalId: doc.id,
              ...(doc.data() as UserSettings),
            });
          });
          return {
            data: queryData,
          };
        } catch (error) {
          return error;
        }
      },
    }),
  }),
});
export const { useGetUserSettingsQuery } = settingsApi;
