import React from "react";

import { Box } from "@chakra-ui/react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate, useParams } from "react-router-dom";
import { Skeleton } from "../../components/shared";
import { auth } from "../../firebase.config";
import AppLayout from "../../layout/AppLayout";
import { useGetUserQuery } from "../../redux/api/authApi";

type UserProfileProps = {};

const UserProfile = (props: UserProfileProps) => {
  const { username } = useParams();
  const navigate = useNavigate();

  const [user, loading, error] = useAuthState(auth);
  const { isError, isLoading, data } = useGetUserQuery({
    by: "username",
    user: username,
  });

  if (isError) {
    return <Box>isError</Box>;
  }

  if (isLoading || loading) {
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
          {user?.email === data?.email
            ? "is able to edit - owns this profile - sunday"
            : "not able to edit"}
          {}
        </Box>
      </Box>
    </AppLayout>
  );
};

export default UserProfile;
