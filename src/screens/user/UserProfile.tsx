import { Box } from "@chakra-ui/react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase.config";
import { useGetUserQuery } from "../../redux/api/authApi";

type UserProfileProps = {};

const UserProfile = (props: UserProfileProps) => {
  const [user, loading, error] = useAuthState(auth);

  const { isError, isLoading, data } = useGetUserQuery(user?.email ?? 0);

  if (isError) {
    return <Box>isError</Box>;
  }
  if (loading) {
    return <Box>Loading</Box>;
  }

  console.log(data);

  return <Box>data</Box>;
};

export default UserProfile;
