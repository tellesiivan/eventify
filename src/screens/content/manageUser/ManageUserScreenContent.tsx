import React from "react";

import { Text } from "@chakra-ui/react";
import { ManageUserProfileContent } from "@simplimods/screens";
import { ManageUserNavigationTabItems } from "@simplimods/types";
import { useGetUserSettingsQuery } from "@simplimods/redux";

interface ManageUserScreenContentProps {
  activeNavItem: ManageUserNavigationTabItems;
  currentUserUid: string;
}

/** makes sure the key is keyof <ManageUserNavItems> and value would be a <ReactNode> */
type ManageUserContentSections = Record<
  ManageUserNavigationTabItems,
  JSX.Element
>;

export const ManageUserScreenContent = ({
  activeNavItem,
  currentUserUid,
}: ManageUserScreenContentProps) => {
  // RTK QUERIES
  const {
    isError: isSettingsError,
    isLoading: isSettingsLoading,
    data: settingsData,
  } = useGetUserSettingsQuery({
    uid: currentUserUid,
  });

  const manageUserContent: ManageUserContentSections = {
    Profile: <ManageUserProfileContent />,
    Events: <Text variant="s1">MANAGE PAGE FOR : Events</Text>,
    Links: <Text variant="s1">MANAGE PAGE FOR : Links</Text>,
    Vehicles: <Text variant="base">MANAGE PAGE FOR : Vehicles</Text>,
  };

  return manageUserContent[`${activeNavItem}`];
};

export default ManageUserScreenContent;
