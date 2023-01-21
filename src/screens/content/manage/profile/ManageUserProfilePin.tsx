import React from "react";
import {
  Card,
  PrivatePinInputWithSubmitButton,
  TextHeader,
} from "@simplimods/components";

interface ManageUserProfilePinProps {
  currentUserPin: number | null;
}

export const ManageUserProfilePin = ({
                                         currentUserPin,
                                     }: ManageUserProfilePinProps) => {


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
                title="Private Pin"
                description={
                    currentUserPin
                        ? "Here you can update your private pin."
                        : "Add a private pin to be able to view other users contact information and to be able to create events."
                }
                mb={{base: 8, lg: 0}}
            />
            <PrivatePinInputWithSubmitButton
                initialPin={currentUserPin ? currentUserPin.toString() : ""}
            />
        </Card>
    );
};
