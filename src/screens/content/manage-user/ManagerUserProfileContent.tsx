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
  const authUser = useAppSelector((state: RootState) => state.auth.user);
  const { isError, isLoading, data } = useGetUserQuery({
    by: "email",
    user: authUser.email,
  });
  const imageSrc =
    "https://porschemelbourne.com.au/Media/Page-images/classic.jpg";

  if (isLoading) {
    return <Skeleton h={60} />;
  }

  const userCreatedDate = data?.timestamp
    ? convertTimestamp(data.timestamp)
    : null;

  const formattedUserCreatedDate = userCreatedDate
    ? formatDate(new Date(userCreatedDate as Date))
    : null;

  console.log(data);

  return (
    <VStack p={2} width="full" spacing={4} maxWidth="container.lg" mx="auto">
      {/* ==== USER PROFILE BG IMAGE ==== */}
      <VStack width="full">
        <TextHeader
          maxWidth={{ base: "sm", md: "xl" }}
          mr="auto"
          my={2}
          title={`Hello ${data?.username && data.username}`}
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
            maxWidth="64"
            my={2}
            title="Your Avatar"
            description="Click on the avatar to upload a custom one from your files."
          />
          <ProfileAvatarUpload userAvatar={imageSrc} />
        </HStack>
      </Card>
    </VStack>
  );
};

export default ManagerUserProfileContent;
