import { withAuthenticationRequired } from "@auth0/auth0-react";
import React, { JSXElementConstructor } from "react";

import { ReactElement } from "react";
import { Navigate, Route, RouteProps } from "react-router-dom";
import { Skeleton } from "../components/shared";

interface ProtectedRouteProps extends RouteProps {
  isLoggedIn: boolean;
  component: ReactElement;
}

const ProtectedRoute = ({
  isLoggedIn,
  component,
}: ProtectedRouteProps): JSX.Element => {
  if (!isLoggedIn) {
    return <Navigate to="/home" replace />;
  }
  return component;
};
export default ProtectedRoute;

interface PrivateRoute {
  component: ReactElement<any, string | JSXElementConstructor<any>>;
}

// const PrivateRoute = (props: PrivateRoute) => (
//   <Route
//     element={withAuthenticationRequired(props.component, {
//       onRedirecting: () => <Skeleton />,
//     })}
//     {...props}
//   />
// );
