import { storage } from "@simplimods/firebase";
import { baseApiSlice } from "@simplimods/redux/api/baseApi";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { doc, updateDoc } from "firebase/firestore";
import { userProfile, UserProfileSourceReference } from "@simplimods/types";

export const userProfileImagesApi = baseApiSlice.injectEndpoints({
  endpoints: (build) => ({
    uploadProfileAvatarImage: build.mutation<
      string,
      {
        userUid: string;
        imageDataUrl: string;
      }
    >({
      async queryFn({ userUid, imageDataUrl }): Promise<any> {
        const userAvatarUploadRef = ref(storage, `avatars/${userUid}.jpeg`);
        const userAvatarUploadPath = userAvatarUploadRef.fullPath;
        const userAvatarUploadBucket = userAvatarUploadRef.bucket;
        // user profile reference
        const userProfileRef = doc(
          userProfile,
          `/${userUid}/profile/${userUid}`
        );
        const assetReference: UserProfileSourceReference = {
          bucketReference: userAvatarUploadBucket,
          path: userAvatarUploadPath,
          type: "avatar",
        };
        try {
          await uploadString(userAvatarUploadRef, imageDataUrl, "data_url");
          const downloadURL = await getDownloadURL(userAvatarUploadRef);
          await updateDoc(userProfileRef, {
            // @ts-ignore
            "admin.assetsReference": assetReference,
            "public.avatarImageSrc": downloadURL,
          });
          return { data: "success" };
        } catch (e) {
          return { error: "Unable to upload image" };
        }
      },
      invalidatesTags: ["MemberGraph"],
    }),
    uploadProfileCoverImage: build.mutation<
      string,
      {
        userUid: string;
        imageDataUrl: string;
      }
    >({
      async queryFn({ userUid, imageDataUrl }): Promise<any> {
        const userAvatarUploadRef = ref(
          storage,
          `profileCoverImages/${userUid}.jpeg`
        );
        const userAvatarUploadPath = userAvatarUploadRef.fullPath;
        const userAvatarUploadBucket = userAvatarUploadRef.bucket;
        // user profile reference
        const userProfileRef = doc(
          userProfile,
          `/${userUid}/profile/${userUid}`
        );
        const assetReference: UserProfileSourceReference = {
          bucketReference: userAvatarUploadBucket,
          path: userAvatarUploadPath,
          type: "coverImage",
        };
        try {
          await uploadString(userAvatarUploadRef, imageDataUrl, "data_url");
          const downloadURL = await getDownloadURL(userAvatarUploadRef);
          await updateDoc(userProfileRef, {
            // @ts-ignore
            "admin.assetsReference": assetReference,
            "public.coverImageSrc": downloadURL,
          });
          return { data: "success" };
        } catch (e) {
          return { error: "Unable to upload image" };
        }
      },
      invalidatesTags: ["MemberGraph"],
    }),
  }),
});
export const {
  useUploadProfileAvatarImageMutation,
  useUploadProfileCoverImageMutation,
} = userProfileImagesApi;
