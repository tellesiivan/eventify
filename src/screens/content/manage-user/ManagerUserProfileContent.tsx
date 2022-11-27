import { SimpleGrid, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { Card, TextHeader } from "../../../components/shared";
import { ProfileAvatarUpload, UserBackgroundCoverImage } from "../../../layout";
import { useGetUserQuery } from "../../../redux/api/authApi";
import { useAppSelector } from "../../../redux/reduxHooks";
import { RootState } from "../../../redux/store";

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

  console.log(data);

  return (
    <VStack p={2} width="full" spacing={4} maxWidth="container.lg" mx="auto">
      {/* ==== USER PROFILE BG IMAGE ==== */}
      <VStack width="full">
        <TextHeader
          my={2}
          title="Basic Info"
          description="Customize your public profile here, from background cover image to your general location."
        />
        <UserBackgroundCoverImage
          canManage={true}
          imageSrc={imageSrc}
          isLoading={isLoading}
        />
      </VStack>
      {/* ==== USER PROFILE BG IMAGE ==== */}
      <SimpleGrid
        columns={{
          base: 1,
          lg: 2,
        }}
        spacing={4}
        width="full"
      >
        <Card rounded="md" py={4}>
          <VStack width="full" spacing={4}>
            <Text variant="s1">Profile Image</Text>
            <ProfileAvatarUpload />
          </VStack>
        </Card>
        <Card rounded="md">
          <VStack width="full"></VStack>
        </Card>
      </SimpleGrid>
    </VStack>
  );
};

export default ManagerUserProfileContent;
