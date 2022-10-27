import { Box, Skeleton } from "@chakra-ui/react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../firebase.config";
import { useGetUserQuery } from "../../../redux/api/authApi";

type UserProfileProps = {};

const ManagePage = (props: UserProfileProps) => {
  const [user, loading] = useAuthState(auth);

  const { isError, isLoading, data } = useGetUserQuery({
    by: "email",
    user: user?.email,
  });

  return (
    <Skeleton isLoaded={!loading && !isLoading} fadeDuration={2} m={3}>
      <Box>
        <Box h={48} w="full" bg="wzg.600" />
        <Box>MANAGE PAGE FOR : {data?.username}</Box>
      </Box>
    </Skeleton>
  );
};

export default ManagePage;
