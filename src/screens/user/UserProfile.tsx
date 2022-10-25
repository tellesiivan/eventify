import { Box } from "@chakra-ui/react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate, useParams } from "react-router-dom";
import { auth } from "../../firebase.config";
import { useGetUserQuery } from "../../redux/api/authApi";

type UserProfileProps = {};

const UserProfile = (props: UserProfileProps) => {
  const { username } = useParams();
  const navigate = useNavigate();

  const [user, loading, error] = useAuthState(auth);
  const { isError, isLoading, data } = useGetUserQuery(username);

  if (isError) {
    return <Box>isError</Box>;
  }
  if (isLoading) {
    return <Box>Loading</Box>;
  }
  if (!data) {
    return <Box>no user found</Box>;
  }

  return (
    <Box>
      <Box h={48} w="full" bg="wzy.600" />
      <Box>
        {user?.email === data.email
          ? "is able to edit - owns this profile"
          : "not able to edit"}
        {}
      </Box>
    </Box>
  );
};

export default UserProfile;
