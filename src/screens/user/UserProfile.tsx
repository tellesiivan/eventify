import React from "react";

import { Box } from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import { Skeleton } from "@simplimods/components";
import { AppLayout } from "@simplimods/layout";
import { useGetUserQuery } from "@simplimods/redux";

type UserProfileProps = {};

const UserProfile = (props: UserProfileProps) => {
  const { username } = useParams();
  const navigate = useNavigate();

  const { isError, isLoading, data } = useGetUserQuery({
    by: "username",
    user: username,
  });

  if (isError) {
    return <Box>isError</Box>;
  }

  if (isLoading || isLoading) {
    return <Skeleton height={96} />;
  }

  if (!data && !isLoading) {
    return <Box>no user found</Box>;
  }

  return (
    <AppLayout>
      <Box>
        <Box h={48} w="full" bg="red.600" />
        <Box>
          {data?.username === username
            ? "is able to edit - owns this profile - sunday"
            : "not able to edit"}
          {}
        </Box>
      </Box>
    </AppLayout>
  );
};

export default UserProfile;
