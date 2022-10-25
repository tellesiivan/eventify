import { ReactElement } from "react";
import { Navigate, RouteProps } from "react-router-dom";
import { useAppSelector } from "../redux/reduxHooks";

interface ProtectedRouteProps extends RouteProps {
  isLoggedIn: boolean;
  component: ReactElement;
}

const ProtectedRoute = ({
  isLoggedIn,
  component,
}: ProtectedRouteProps): JSX.Element => {
  const { user } = useAppSelector((state) => state.auth);

  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }
  return component;
};
export default ProtectedRoute;
