import {
  CombineUserProfileInformation,
  UserAdminProfile,
  UserPublicProfile,
  UserSettings,
} from "@simplimods/types";
import type { DocumentData, DocumentReference } from "firebase/firestore";
import {
  collection,
  doc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  where,
} from "firebase/firestore";
import { firestoreDb } from "@simplimods/firebase";
import { baseApiSlice } from "@simplimods/redux/api/baseApi";

interface newUser {
  user: {
    email: string;
    username: string;
    uid: string;
  };
  settings: UserSettings;
  publicProfile: UserPublicProfile;
  adminProfile: UserAdminProfile;
}

interface user {
  email: string;
  username: string;
  timestamp: Date;
}

interface GetUserBy {
  user: string | undefined;
  by: "email" | "username";
}

export const authApi = baseApiSlice.injectEndpoints({
  endpoints: (build) => ({
    addUser: build.mutation<undefined, newUser>({
      async queryFn(newUser) {
        let data: any = {};
        const user = newUser.user;
        const settings = newUser.settings;
        const publicProfile = newUser.publicProfile;
        const adminProfile = newUser.adminProfile;

        // create an object that includes an overview of a user admin/private info
        const userProfileData: CombineUserProfileInformation = {
          admin: adminProfile,
          public: publicProfile,
        };

        // doc + collection references
        const usersRef: DocumentReference<DocumentData> = doc(
          firestoreDb,
          "memberGraph",
          user.uid
        );
        // user settings ref
        const settingsRef: DocumentReference<DocumentData> = doc(
          usersRef,
          "settings",
          user.uid
        ); // user profile ref
        const profileRef: DocumentReference<DocumentData> = doc(
          usersRef,
          "profile",
          user.uid
        );

        try {
          // add user to memberGraph collection
          await setDoc(usersRef, {
            ...user,
            timestamp: serverTimestamp(),
          });

          // add user default settings collection
          await setDoc(settingsRef, settings);

          // add user default settings collection
          await setDoc(profileRef, userProfileData);

          const q = query(
            collection(firestoreDb, "memberGraph"),
            where("username", "==", user.username)
          );

          const querySnapshot = await getDocs(q);

          querySnapshot.forEach(
            (document) =>
              (data = {
                internalId: document.id,
                ...document.data(),
              })
          );
          return data;
        } catch (err) {
          return { error: err };
        }
      },
      invalidatesTags: ["Membergraph"],
    }),

    //***************SINGLE USER FETCHING*************** */
    getUser: build.query<user, GetUserBy>({
      async queryFn({ user, by }): Promise<any> {
        const filterBy = where(by, "==", user);
        try {
          const q = query(collection(firestoreDb, "memberGraph"), filterBy);
          const querySnapshot = await getDocs(q);
          let queryData: any;
          querySnapshot.forEach((doc) => {
            queryData = {
              internalId: doc.id,
              ...doc.data(),
            };
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
export const { useAddUserMutation, useGetUserQuery, useLazyGetUserQuery } =
  authApi;
