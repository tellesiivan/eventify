import React from "react";
import { Card, TextHeader } from "@simplimods/components";
import { Flex } from "@chakra-ui/react";
import { ManageUserProfileInterestSelectionTags } from "@simplimods/screens";

interface ManageUserProfileInterestSelectionProps {}

export const ManageUserProfileInterestSelection = (
  props: ManageUserProfileInterestSelectionProps
) => {
  return (
    <Card
      width="full"
      rounded="md"
      p={{
        base: 4,
        md: 6,
      }}
    >
      <Flex flexDirection="column" width="full">
        <TextHeader
          maxWidth={{
            base: "full",
            lg: "96",
          }}
          my={2}
          title="Interest"
          description="Select and update your interests, helps us show you listings, events, and modifications related to your interest selection. "
          mb={{ base: 8, lg: 4 }}
        />
        <ManageUserProfileInterestSelectionTags />
      </Flex>
    </Card>
  );
};
