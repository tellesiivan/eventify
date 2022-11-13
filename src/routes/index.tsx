import { Navigate, Route, Routes } from "react-router-dom";

import Auth from "../screens/Auth";

import { Flex, Spinner } from "@chakra-ui/react";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase.config";
import BaseNav from "../layout/BaseNav";
import { useGetUserQuery } from "../redux/api/authApi";
import { useAppDispatch } from "../redux/reduxHooks";
import { addAuthUser } from "../redux/slices/authSlice";
import Feed from "../screens/feed/Feed";
import ManagePage from "../screens/user/auth/Manage";
import UserProfile from "../screens/user/UserProfile";
import ProtectedRoute from "./ProtectedRoute";

type Props = {};

const NavRoutes = (props: Props) => {
  const dispatch = useAppDispatch();
  const [user, loading] = useAuthState(auth);
  const { isError, isLoading, data } = useGetUserQuery({
    by: "email",
    user: user?.email,
  });

  useEffect(() => {
    if (loading || isLoading) {
      return;
    } else {
      dispatch(
        addAuthUser({
          userName: data?.username ? data.username : "",
          email: user?.email ? user.email : "",
        })
      );
    }
  }, [user, loading, isLoading, dispatch, data]);

  if (loading || isLoading) {
    return (
      <Flex
        padding="6"
        boxShadow="lg"
        h="calc(100vh)"
        w="calc(100vw)"
        minHeight="full"
        justifyContent="center"
        alignItems="center"
      >
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="secondary.200"
          color="primary.400"
          size="xl"
        />
      </Flex>
    );
  }

  const isLoggedIn = !!user?.email;

  return (
    <Routes>
      {/* BaseNav: add a route below to include prelogin layout*/}
      <Route path="/" element={<BaseNav />}>
        <Route path="/auth" element={<Auth />} />
        <Route path="/home" element={user ? <Feed /> : <Auth />}>
          <Route index element={user ? <Feed /> : <Auth />} />
        </Route>
        <Route
          path="/"
          element={<Navigate to={isLoggedIn ? "/home" : "/auth"} />}
        />

        <Route
          path="/manage"
          element={
            <ProtectedRoute
              isLoggedIn={isLoggedIn}
              component={<ManagePage />}
            />
          }
        />

        <Route path="/:username" element={<UserProfile />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Route>
    </Routes>
  );
};

export default NavRoutes;
