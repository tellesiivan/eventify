import { Box, Skeleton, Text } from "@chakra-ui/react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../firebase.config";
import AppLayout from "../../../layout/AppLayout";
import { useGetUserQuery } from "../../../redux/api/authApi";

type UserProfileProps = {};

const ManagePage = (props: UserProfileProps) => {
  const [user, loading] = useAuthState(auth);
  const { isError, isLoading, data } = useGetUserQuery({
    by: "email",
    user: user?.email,
  });

  return (
    <AppLayout>
      <Skeleton isLoaded={!loading && !isLoading} fadeDuration={2}>
        <Box>
          <Box h={48} w="full" bg="wzg.600" />
          <Box>
            {/* change basic font style in them */}
            <Text variant="secondary">MANAGE PAGE FOR : {data?.username}</Text>
          </Box>
        </Box>
      </Skeleton>
    </AppLayout>
  );
};

export default ManagePage;
