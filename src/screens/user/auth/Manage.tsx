import { Box } from "@chakra-ui/react";
import { useAppSelector } from "../../../redux/reduxHooks";

type UserProfileProps = {};

const ManagePage = (props: UserProfileProps) => {
  const { user } = useAppSelector((state) => state.auth);

  return (
    <Box>
      <Box h={48} w="full" bg="wzy.600" />
      <Box>MANAGE PAGE FOR : {user.email}</Box>
    </Box>
  );
};

export default ManagePage;
