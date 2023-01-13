import { HStack, VStack } from "@chakra-ui/react";
import {
  Card,
  InputWithSubmitButton,
  PrivatePinInputWithSubmitButton,
  Skeleton,
  TextHeader,
} from "@simplimods/components";
import {
  ProfileAvatarUpload,
  UserBackgroundCoverImage,
} from "@simplimods/layout";
import {
  selectCurrentAuthUser,
  useAppSelector,
  useGetUserCombineProfileInformationQuery,
  useLazyGetUserLocationByZipcodeQuery,
  useUpdateUserLocationMutation,
} from "@simplimods/redux";
import { ManageUserProfileInterestAndCategorySelection } from "@simplimods/screens";
import React, { useState } from "react";
import { BaseApiRoutes } from "@simplimods/types";

interface ManageUserProfileContentProps {}

export const ManageUserProfileContent = (
  props: ManageUserProfileContentProps
) => {
  const [zipcodeInputValue, setZipcodeInputValue] = useState<string>("");
  const authUser = useAppSelector(selectCurrentAuthUser);

  // RTK === User profile information
  const { data, isError, isLoading } = useGetUserCombineProfileInformationQuery(
    {
      uid: authUser.uid ? authUser.uid : "",
    }
  );

  // RTK === User location
  const [searchUserLocation, { isLoading: isUserLocationRequestLoading }] =
    useLazyGetUserLocationByZipcodeQuery();

  const [
    updateUsersLocation,
    { isError: isUpdateLocationError, isLoading: isUpdateLocationIsLoading },
  ] = useUpdateUserLocationMutation();

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

  // handle user zipcode update
  const zipcodeUpdateHandler = async () => {
    try {
      const locationSearchResponse = await searchUserLocation({
        baseApiRoute: BaseApiRoutes.ZIPPOPOTAM,
        zipcode: +zipcodeInputValue,
        country: "us",
      }).unwrap();
      if (userUID) {
        await updateUsersLocation({
          userUid: userUID,
          locationData: locationSearchResponse,
          existingData: publicProfileData,
        });
      }
      setZipcodeInputValue("");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <VStack p={2} width="full" spacing={4} maxWidth="container.xl" mx="auto">
      {/* ==== USER PROFILE BG IMAGE ==== */}
      <VStack width="full">
        <TextHeader
          isMainHeading={true}
          maxWidth={{ base: "sm", md: "xl" }}
          mr="auto"
          my={2}
          title={`Welcome ${
            publicProfileData?.username && publicProfileData.username
          },`}
          description="Customize your public profile here, from background cover image to your general location."
        />
        <UserBackgroundCoverImage
          canManage={true}
          imageSrc={publicProfileData.coverImageSrc}
          isLoading={isLoading}
        />
      </VStack>

      {/* ==== USER PROFILE AVATAR IMAGE ==== */}
      <Card
        rounded="md"
        p={{
          base: 4,
          md: 6,
        }}
        width="full"
      >
        <HStack width="full" justifyContent="space-between">
          <TextHeader
            maxWidth="64"
            my={2}
            title="Your Avatar"
            description="Click on the avatar to upload a custom one from your files."
          />
          <ProfileAvatarUpload userAvatar={publicProfileData.avatarImageSrc} />
        </HStack>
      </Card>

      {/* ==== USER LOCATION | ZIPCODE ==== */}
      <Card
        rounded="md"
        p={{
          base: 4,
          md: 6,
        }}
        responsiveFlexCard={true}
      >
        <TextHeader
          maxWidth={{
            base: "full",
            lg: "64",
          }}
          my={2}
          title="General Location"
          description="Add your zipcode to find nearby events and more."
          mb={{ base: 8, lg: 0 }}
        />
        <InputWithSubmitButton
          placeholder={
            publicProfileData.location.city &&
            publicProfileData.location.stateAbbreviation
              ? `${publicProfileData.location.city}, ${publicProfileData.location.stateAbbreviation}`
              : "Zipcode..."
          }
          isLoading={isUpdateLocationIsLoading || isUserLocationRequestLoading}
          onSubmitClick={zipcodeUpdateHandler}
          setInputValue={setZipcodeInputValue}
          inputValue={zipcodeInputValue}
          inputType="number"
        />
      </Card>

      {/* ==== USER PIN | Needed if user wants to view other users contact info or create events ==== */}

      <Card
        rounded="md"
        p={{
          base: 4,
          md: 6,
        }}
        responsiveFlexCard={true}
      >
        <TextHeader
          maxWidth={{
            base: "full",
            lg: "64",
          }}
          my={2}
          title="Private Pin"
          description={
            adminProfileData.pin
              ? "Here you can update your private pin."
              : "Add a private pin to be able to view other users contact information and to be able to create events."
          }
          mb={{ base: 8, lg: 0 }}
        />
        <PrivatePinInputWithSubmitButton
          initialPin={
            adminProfileData.pin ? adminProfileData.pin.toString() : ""
          }
        />
      </Card>

      {/* ==== USER PROFILE CATEGORY SELECTION | User selects what time of category they identify with  ==== */}
      {/* ==== USER INTEREST SELECTION | Will be used to show user interest related content  ==== */}
      <ManageUserProfileInterestAndCategorySelection
        currentProfileCategory={publicProfileData.profileCategory}
      />
    </VStack>
  );
};
