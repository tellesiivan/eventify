import { ReactElement } from "react";
import { Navigate, RouteProps } from "react-router-dom";

interface ProtectedRouteProps extends RouteProps {
  isLoggedIn: boolean;
  component: ReactElement;
}

const ProtectedRoute = ({
  isLoggedIn,
  component,
}: ProtectedRouteProps): JSX.Element => {
  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }
  return component;
};
export default ProtectedRoute;
