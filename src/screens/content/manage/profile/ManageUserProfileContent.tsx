import { VStack } from "@chakra-ui/react";
import { Skeleton } from "@simplimods/components";
import {
  selectCurrentAuthUser,
  useAppSelector,
  useGetUserCombineProfileInformationQuery,
} from "@simplimods/redux";
import {
  ManageUserProfileCoverImageUpload,
  ManageUserProfileInterestAndCategorySelection,
  ManageUserProfileLocation,
  ManageUserProfilePin,
} from "@simplimods/screens";
import React from "react";

export const ManageUserProfileContent = () => {
  const authUser = useAppSelector(selectCurrentAuthUser);

  // RTK === User profile information
  const { data, isError, isLoading } = useGetUserCombineProfileInformationQuery(
    {
      uid: authUser.uid ? authUser.uid : "",
    }
  );

  if (isError) {
    return <Skeleton h={60} />;
  }

  if (isLoading) {
    return <Skeleton screenToMock={"ManageUserProfile"} />;
  }

  if (!data) {
    return <Skeleton h={60} />;
  }

  // user profile reference
  const publicProfileData = data.public;
  const adminProfileData = data.admin;
  const userUID = data.uid;

  return (
    <VStack p={2} width="full" spacing={3} maxWidth="container.xl" mx="auto">
      {/* ==== USER PROFILE BG IMAGE &&  USER PROFILE AVATAR IMAGE ==== */}

      <ManageUserProfileCoverImageUpload
        username={publicProfileData.username}
      />
      {/* ==== USER LOCATION | ZIPCODE ==== */}
      {userUID && (
        <ManageUserProfileLocation
          uid={userUID}
          profileData={publicProfileData}
        />
      )}

      {/* ==== USER PIN | Needed if user wants to view other users contact info or create events ==== */}
      <ManageUserProfilePin currentUserPin={adminProfileData.pin} />

      {/* ==== USER PROFILE CATEGORY SELECTION | User selects what time of category they identify with  ==== */}
      {/* ==== USER INTEREST SELECTION | Will be used to show user interest related content  ==== */}
      <ManageUserProfileInterestAndCategorySelection
        currentProfileCategory={publicProfileData.profileCategory}
      />
    </VStack>
  );
};
