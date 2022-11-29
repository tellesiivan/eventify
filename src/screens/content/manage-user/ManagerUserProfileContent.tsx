import { HStack, VStack } from "@chakra-ui/react";
import { convertTimestamp } from "convert-firebase-timestamp";
import React from "react";
import { Card, Skeleton, TextHeader } from "../../../components/shared";
import { ProfileAvatarUpload, UserBackgroundCoverImage } from "../../../layout";
import { useGetUserQuery } from "../../../redux/api/authApi";
import { useAppSelector } from "../../../redux/reduxHooks";
import { RootState } from "../../../redux/store";
import { formatDate } from "../../../utils";

interface ManagerUserProfileContentProps {}

export const ManagerUserProfileContent = (
  props: ManagerUserProfileContentProps
) => {
  const authUser = useAppSelector((state: RootState) => state.auth.user.email);
  const { isError, isLoading, data } = useGetUserQuery({
    by: "email",
    user: authUser,
  });
  const imageSrc =
    "https://images.unsplash.com/photo-1605906457463-5eb60f753738?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1330&q=80";

  if (isLoading) {
    return <Skeleton h={60} />;
  }

  const userCreatedDate = data?.timestamp
    ? convertTimestamp(data.timestamp)
    : null;

  const formattedUserCreatedDate =
    userCreatedDate !== null && formatDate(new Date(userCreatedDate as Date));

  return (
    <VStack p={2} width="full" spacing={4} maxWidth="container.lg" mx="auto">
      {/* ==== USER PROFILE BG IMAGE ==== */}
      <VStack width="full">
        <TextHeader
          my={2}
          title={`Hello ${
            data?.username ? data.username + "," + formattedUserCreatedDate : ""
          }`}
          description="Customize your public profile here, from background cover image to your general location."
        />
        <UserBackgroundCoverImage
          canManage={true}
          imageSrc={imageSrc}
          isLoading={isLoading}
        />
      </VStack>
      {/* ==== USER PROFILE BG IMAGE ==== */}
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
            my={2}
            title="Your Avatar"
            description="Click on the avatar to upload a custom one from your files."
          />
          <ProfileAvatarUpload userAvatar={imageSrc} />
        </HStack>
      </Card>
      <Card rounded="md">
        <VStack width="full"></VStack>
      </Card>
    </VStack>
  );
};

export default ManagerUserProfileContent;
