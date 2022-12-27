import { UserSettings } from "@simplimods/types";
import type {
  CollectionReference,
  DocumentData,
  DocumentReference,
} from "firebase/firestore";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  where,
} from "firebase/firestore";
import { firestoreDb } from "../../firebase/firebase.config";
import { baseApiSlice } from "./baseApi";

interface newUser {
  user: {
    email: string;
    username: string;
    uid: string;
  };
  settings: UserSettings;
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

        // doc + collection references
        const usersRef: DocumentReference<DocumentData> = doc(
          firestoreDb,
          "memberGraph",
          user.uid
        );
        const settingsRef: CollectionReference<DocumentData> = collection(
          usersRef,
          "settings"
        );

        try {
          // add user to memberGraph collection
          await setDoc(usersRef, {
            ...user,
            timestamp: serverTimestamp(),
          });

          // add user default settings collection
          await addDoc(settingsRef, settings);

          const q = query(
            collection(firestoreDb, "memberGraph"),
            where("username", "==", user.username)
          );

          const querySnapshot = await getDocs(q);

          querySnapshot.forEach(
            async (document) =>
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
