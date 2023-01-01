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
  useGetUserQuery,
} from "@simplimods/redux";
import { formatDate } from "@simplimods/utils";
import { convertTimestamp } from "convert-firebase-timestamp";
import React, { useState } from "react";
import { UserSettingsWithIdRefGraph } from "@simplimods/types";

interface ManageUserProfileContentProps {
  settings: UserSettingsWithIdRefGraph;
}

export const ManageUserProfileContent = ({
  settings,
}: ManageUserProfileContentProps) => {
  const [zipcodeInputValue, setZipcodeInputValue] = useState<string>("");
  const authUser = useAppSelector(selectCurrentAuthUser);
  const { isError, isLoading, data } = useGetUserQuery({
    by: "email",
    user: authUser.email ?? undefined,
  });

  const imageSrc =
    "https://www.automoblog.net/wp-content/uploads/2022/05/2023-Porsche-911-Sport-Classic-1.jpg";

  if (isError) {
    return <Skeleton h={60} />;
  }

  if (isLoading) {
    return <Skeleton h={60} />;
  }

  const userCreatedDate = data?.timestamp
    ? convertTimestamp(data.timestamp)
    : null;

  const formattedUserCreatedDate = userCreatedDate
    ? formatDate(new Date(userCreatedDate as Date))
    : null;

  // handle user zipcode update
  const zipcodeUpdateHandler = () => console.log(zipcodeInputValue);

  return (
    <VStack p={2} width="full" spacing={4} maxWidth="container.xl" mx="auto">
      {/* ==== USER PROFILE BG IMAGE ==== */}
      <VStack width="full">
        <TextHeader
          maxWidth={{ base: "sm", md: "xl" }}
          mr="auto"
          my={2}
          title={`Welcome back ${data?.username && data.username},`}
          description="Customize your public profile here, from background cover image to your general location."
        />
        <UserBackgroundCoverImage
          canManage={true}
          imageSrc={imageSrc}
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
          <ProfileAvatarUpload userAvatar={imageSrc} />
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
          placeholder="zipcode..."
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
            settings.hasPin
              ? "Here you can update your private pin."
              : "Add a private pin to be able to view other users contact information and to be able to create events."
          }
          mb={{ base: 8, lg: 0 }}
        />
        <PrivatePinInputWithSubmitButton />
      </Card>
    </VStack>
  );
};

export default ManageUserProfileContent;
