import React from "react";
import { HStack, VStack } from "@chakra-ui/react";
import { Card, Skeleton, TextHeader } from "@simplimods/components";
import { UserBackgroundCoverImage } from "@simplimods/layout";
import {
  selectCurrentAuthUserUid,
  useAppSelector,
  useGetUserPublicProfileQuery,
} from "@simplimods/redux";

interface ManageUserProfileCoverImageUploadProps {
  username: string;
}

export const ManageUserProfileCoverImageUpload = ({
  username,
}: ManageUserProfileCoverImageUploadProps) => {
  // selectors
  const userUid = useAppSelector(selectCurrentAuthUserUid);

  const {
    data: publicProfileData,
    isLoading: isUserProfileLoading,
    isError,
  } = useGetUserPublicProfileQuery({
    uid: userUid ?? "",
  });

  if (isError) {
    return <Skeleton />;
  }
  if (isUserProfileLoading) {
    return <Skeleton />;
  }
  if (!publicProfileData) {
    return <Skeleton />;
  }

  return (
    <VStack width="full">
      <TextHeader
        isMainHeading={true}
        maxWidth={{ base: "sm", md: "xl" }}
        mr="auto"
        my={2}
        title={`Welcome ${username},`}
        description="Customize your public profile here, from background cover image to your general location."
      />
      <Card width="full" rounded="md" p={0} overflow="hidden">
        <UserBackgroundCoverImage
          canManage={true}
          imageSrc={publicProfileData.coverImageSrc}
          avatarImgSrc={publicProfileData.avatarImageSrc}
        />
        <HStack
          pt={10}
          pb={6}
          px={6}
          width="full"
          alignItems="center"
          justifyContent="space-between"
        >
          <TextHeader
            maxWidth="64"
            my={2}
            title="Your Avatar"
            description="Click on the avatar or cover image to upload a custom one from your files."
          />
        </HStack>
      </Card>
    </VStack>
  );
};
