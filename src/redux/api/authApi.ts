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

export const authApi = baseApiSlice.injectEndpoints({
  endpoints: (build) => ({
    addUser: build.mutation<undefined, newUser>({
      async queryFn(user) {
        const usersRef = collection(firestoreDb, "users");
        let data: any = {};
        try {
          await addDoc(usersRef, {
            ...user,
            timestamp: serverTimestamp(),
          });
          const q = query(
            collection(firestoreDb, "users"),
            where("email", "==", user.email)
          );
          const querySnapshot = await getDocs(q);
          querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
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
    getUser: build.query<user, undefined | string>({
      async queryFn(username): Promise<any> {
        try {
          const q = query(
            collection(firestoreDb, "users"),
            where("username", "==", username)
          );
          const querySnapshot = await getDocs(q);
          let queryData: any;
          querySnapshot.forEach((doc) => {
            queryData = {
              timestamp: doc.data().timestamp.toDate(),
              ...doc.data(),
            };
          });
          console.log(queryData, username);
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
export const { useAddUserMutation, useGetUserQuery } = authApi;
