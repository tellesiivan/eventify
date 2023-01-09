import React from "react";

import { Navigate, Route, Routes } from "react-router-dom";

import { AuthLayout } from "../layout";
import BaseNav from "../layout/BaseNav";
import { useAppSelector } from "@simplimods/redux";

import { LoginScreen, SignupScreen } from "../screens";
import Feed from "../screens/feed/Feed";
import ManageUserScreen from "../screens/user/auth/ManageUserScreen";
import UserProfile from "../screens/user/UserProfile";
import ProtectedRoute from "./ProtectedRoute";

type Props = {};

const NavRoutes = (props: Props) => {
  const isAuthUser = useAppSelector((state) => state.auth.user.email);
  const isAuthStateLoading = useAppSelector(
    (state) => state.auth.isAuthLoading
  );
  const isLoggedIn = !!isAuthUser && !isAuthStateLoading;

  return (
    <Routes>
      {/* BaseNav: add a route below to include pre login layout*/}
      <Route path="/" element={<BaseNav />}>
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="/auth/login" element={<LoginScreen />} />
          <Route path="/auth/signup" element={<SignupScreen />} />
        </Route>
        <Route path="/" element={<Feed />}>
          <Route index />
          <Route path="/home" element={<Feed />} />
        </Route>

        <Route
          path="/manage"
          element={
            <ProtectedRoute
              isLoggedIn={isLoggedIn}
              component={<ManageUserScreen />}
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
