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
} from "@simplimods/redux";
import React, { useState } from "react";
import { ManageUserProfileInterestSelection } from "@simplimods/screens";

interface ManageUserProfileContentProps {}

export const ManageUserProfileContent = (
  props: ManageUserProfileContentProps
) => {
  const [zipcodeInputValue, setZipcodeInputValue] = useState<string>("");
  const authUser = useAppSelector(selectCurrentAuthUser);

  const { data, isError, isLoading } = useGetUserCombineProfileInformationQuery(
    {
      uid: authUser.uid ?? "",
    }
  );

  if (isError) {
    return <Skeleton h={60} />;
  }

  if (isLoading) {
    return <Skeleton h={60} />;
  }

  if (!data) {
    return <Skeleton h={60} />;
  }

  // user profile reference
  const publicProfileData = data.public;
  const adminProfileData = data.admin;
  const userUID = data.uid;

  // console.log(
  //   publicProfileData.memberSinceTimestamp &&
  //     formatDate(new Date(publicProfileData.memberSinceTimestamp), "month-year")
  // );

  // handle user zipcode update
  const zipcodeUpdateHandler = () => console.log(zipcodeInputValue);

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
            publicProfileData.location.zipcode
              ? `Edit Zipcode ${publicProfileData.location.zipcode}...`
              : "Zipcode..."
          }
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

      {/* ==== USER INTEREST SELECTION | Will be used to show user interest related content  ==== */}

      <ManageUserProfileInterestSelection />
    </VStack>
  );
};
