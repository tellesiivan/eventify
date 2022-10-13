import { Box } from "@chakra-ui/react";
import { useGetPostsQuery } from "../../redux/api/example";

type UserProfileProps = {};

const UserProfile = (props: UserProfileProps) => {
  const { posts, isError, isLoading } = useGetPostsQuery(undefined, {
    selectFromResult: ({ data, isLoading, isError }) => ({
      posts: data,
      isLoading,
      isError,
    }),
  });

  console.log(isLoading);

  return (
    <Box>{isLoading && !posts ? "Loading..." : JSON.stringify(posts)}</Box>
  );
};

export default UserProfile;
