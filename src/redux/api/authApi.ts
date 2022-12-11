import {
  addDoc,
  collection,
  getDocs,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { firestoreDb } from "../../firebase/firebase.config";
import { baseApiSlice } from "./baseApi";

interface newUser {
  email: string;
  username: string;
  uid: string;
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
      async queryFn(user) {
        const usersRef = collection(firestoreDb, "memberGraph");
        let data: any = {};
        try {
          await addDoc(usersRef, {
            ...user,
            timestamp: serverTimestamp(),
          });

          const q = query(
            collection(firestoreDb, "memberGraph"),
            where("username", "==", user.username)
          );
          const querySnapshot = await getDocs(q);
          querySnapshot.forEach((doc) => {
            data = doc.data();
          });
          return data;
        } catch (err) {
          return { error: err };
        }
      },
      invalidatesTags: ["Posts"],
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
