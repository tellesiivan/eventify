import { Box, Skeleton, Text } from "@chakra-ui/react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase.config";
import { useGetUserQuery } from "../../redux/api/authApi";

interface ManagaeUserScreenContentProps {}

export const ManagaeUserScreenContent = (
  props: ManagaeUserScreenContentProps
) => {
  const [user, loading] = useAuthState(auth);
  const { isError, isLoading, data } = useGetUserQuery({
    by: "email",
    user: user?.email,
  });

  return (
    <Skeleton isLoaded={!loading && !isLoading} fadeDuration={2}>
      <Box>
        <Box h={48} w="full" bg="wzy.500" rounded="lg" />
        <Box>
          {/* change basic font style in them */}
          <Text variant="s1">MANAGE PAGE FOR : {data?.username}</Text>
        </Box>
      </Box>
    </Skeleton>
  );
};

export default ManagaeUserScreenContent;
