import React, { useState } from "react";
import {
  Card,
  InputWithSubmitButton,
  TextHeader,
} from "@simplimods/components";
import { BaseApiRoutes, UserPublicProfile } from "@simplimods/types";
import {
  useLazyGetUserLocationByZipcodeQuery,
  useUpdateUserLocationMutation,
} from "@simplimods/redux";
import { useCustomToast } from "@simplimods/hooks";

interface ManageUserProfileLocationProps {
  profileData: UserPublicProfile;
  uid: string;
}

export const ManageUserProfileLocation = ({
  uid,
  profileData,
}: ManageUserProfileLocationProps) => {
  const [zipcodeInputValue, setZipcodeInputValue] = useState<string>("");
  // get current users location information
  const { location } = profileData;

  // useCustomToast hook
  const { successToast } = useCustomToast({ position: "bottom-left" });
  const { errorToast } = useCustomToast({ position: "bottom-left" });

  // RTK === Search user location
  const [searchUserLocation, { isLoading: isUserLocationRequestLoading }] =
    useLazyGetUserLocationByZipcodeQuery();

  // RTK === update users location
  const [updateUsersLocation, { isLoading: isUpdateLocationIsLoading }] =
    useUpdateUserLocationMutation();

  /** Updates users location with location search result */
  const zipcodeUpdateHandler = async () => {
    try {
      const locationSearchResponse = await searchUserLocation({
        baseApiRoute: BaseApiRoutes.ZIPPOPOTAM,
        zipcode: +zipcodeInputValue,
        country: "us",
      }).unwrap();
      await updateUsersLocation({
        userUid: uid,
        locationData: locationSearchResponse,
      });
      successToast(
        "Location Updated",
        `Your location has been updated to ${locationSearchResponse.city}, ${locationSearchResponse.stateAbbreviation}`
      );
      setZipcodeInputValue("");
    } catch (e) {
      errorToast(
        "Something went wrong",
        "Zipcode added could not be found, please try again."
      );
      console.log(e);
    }
  };

  return (
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
          location.city && location.stateAbbreviation
            ? `${location.city}, ${location.stateAbbreviation}`
            : "Zipcode..."
        }
        isLoading={isUpdateLocationIsLoading || isUserLocationRequestLoading}
        onSubmitClick={zipcodeUpdateHandler}
        setInputValue={setZipcodeInputValue}
        inputValue={zipcodeInputValue}
        inputType="number"
      />
    </Card>
  );
};
