import { Navigate, Route, Routes } from "react-router-dom";
import Auth from "../screens/Auth";

import { Box, SkeletonCircle, SkeletonText } from "@chakra-ui/react";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase.config";
import BaseNav from "../layout/BaseNav";
import Feed from "../screens/feed/Feed";
import UserProfile from "../screens/user/UserProfile";
import ProtectedRoute from "./ProtectedRoute";

type Props = {};

const NavRoutes = (props: Props) => {
  const [user, loading, error] = useAuthState(auth);

  useEffect(() => {
    if (loading) {
      return;
    }
  }, [user, loading]);

  if (loading) {
    return (
      <Box padding="6" boxShadow="lg" height="100%" width="100%">
        <SkeletonCircle size="10" bg="primary.300" />
        <SkeletonText mt="4" noOfLines={4} spacing="4" bg="primary.300" />
      </Box>
    );
  }

  const isLoggedIn = user ? true : false;

  return (
    <Routes>
      {/* BaseNav: add a route below to include prelogin layout*/}
      <Route path="/auth" element={<Auth />} />
      <Route path="/home" element={<BaseNav />}>
        <Route index element={user ? <Feed /> : <Auth />} />
      </Route>
      <Route
        path="/"
        element={<Navigate to={isLoggedIn ? "/home" : "/auth"} />}
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute isLoggedIn={isLoggedIn} component={<UserProfile />} />
        }
      />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default NavRoutes;
