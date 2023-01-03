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
import {
  UserAdminProfile,
  UserPublicProfile,
  UserSettingsWithIdRefGraph,
} from "@simplimods/types";

interface ManageUserProfileContentProps {
  settings: UserSettingsWithIdRefGraph;
}

export const ManageUserProfileContent = ({
                                             settings,
                                         }: ManageUserProfileContentProps) => {
    const [zipcodeInputValue, setZipcodeInputValue] = useState<string>("");
    const authUser = useAppSelector(selectCurrentAuthUser);

    const {data, isError, isLoading} = useGetUserCombineProfileInformationQuery(
        {
            uid: authUser.uid ?? "",
        }
    );

    const imageSrc =
        "https://www.automoblog.net/wp-content/uploads/2022/05/2023-Porsche-911-Sport-Classic-1.jpg";

    if (isError) {
        return <Skeleton h={60}/>;
    }

    if (isLoading) {
        return <Skeleton h={60}/>;
    }

    // const formattedUserCreatedDate = userCreatedDate
    //   ? formatDate(new Date(userCreatedDate as Date))
    //   : null;

    if (!data) {
        return <Skeleton h={60}/>;
    }

    // user profile reference
    const publicProfileData: UserPublicProfile = data.public;
    const adminProfileData: UserAdminProfile = data.admin;
    const userUID: string | undefined = data.uid;

    console.log(data)

    // handle user zipcode update
    const zipcodeUpdateHandler = () => console.log(zipcodeInputValue);

    return (
        <VStack p={2} width="full" spacing={4} maxWidth="container.xl" mx="auto">
            {/* ==== USER PROFILE BG IMAGE ==== */}
            <VStack width="full">
                <TextHeader
                    isMainHeading={true}
                    maxWidth={{base: "sm", md: "xl"}}
                    mr="auto"
                    my={2}
                    title={`Welcome back ${
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
                    <ProfileAvatarUpload userAvatar={publicProfileData.avatarImageSrc}/>
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
                    mb={{base: 8, lg: 0}}
                />
                <InputWithSubmitButton
                    placeholder={
                        adminProfileData.zipcode
                            ? `Edit Zipcode ${adminProfileData.zipcode}...`
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
                        settings.hasPin
                            ? "Here you can update your private pin."
                            : "Add a private pin to be able to view other users contact information and to be able to create events."
                    }
                    mb={{base: 8, lg: 0}}
                />
                <PrivatePinInputWithSubmitButton
                    initialPin={
                        adminProfileData.pin ? adminProfileData.pin.toString() : ""
                    }
                />
            </Card>
        </VStack>
    );
};

export default ManageUserProfileContent;
