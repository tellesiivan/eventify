import {
  addDoc,
  collection,
  getDocs,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { firestoreDb } from "../../firebase.config";
import { baseApiSlice } from "./baseApi";

interface newUser {
  email: string;
  username: string;
}

interface user {
  email: string;
  username: string;
  timestamp: Date;
}

interface GetUserBy {
  user: undefined | string | null;
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
            where("email", "==", user.email)
          );
          const querySnapshot = await getDocs(q);
          querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
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
        const filterBy = where(
          by === "username" ? "username" : "email",
          "==",
          user
        );
        try {
          const q = query(collection(firestoreDb, "memberGraph"), filterBy);
          const querySnapshot = await getDocs(q);
          let queryData: any;
          querySnapshot.forEach((doc) => {
            queryData = {
              timestamp: doc.data().timestamp.toDate(),
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
