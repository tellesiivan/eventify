import { Navigate, Route, Routes } from "react-router-dom";
import Home from "../screens/Home";

type Props = {};

const NavRoutes = (props: Props) => {
  return (
    <Routes>
      {/* BaseNav: add a route below to include prelogin layout*/}
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default NavRoutes;
