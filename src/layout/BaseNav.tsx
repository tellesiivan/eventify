import { Box } from "@chakra-ui/react";
import { signOut } from "firebase/auth";
import { Outlet, useNavigate } from "react-router-dom";
import { auth } from "../firebase.config";

type Props = {};

const BaseNav = (props: Props) => {
  const navigate = useNavigate();

  const logout = () => {
    signOut(auth);
    navigate("/auth");
  };

  return (
    <>
      <Box
        as="header"
        height="14"
        width="full"
        position="fixed"
        top="0"
        bg="sunglow.600"
      >
        <nav
          className="h-full px-2 mx-auto max-w-7xl sm:px-4 lg:px-6"
          aria-label="Top"
        >
          <div className="flex items-center justify-between w-full h-full">
            <div>logo</div>
            <div className="ml-10 space-x-2">
              <button onClick={logout}>Sign out</button>
              <button>Sign up</button>
            </div>
          </div>
        </nav>
      </Box>
      <main className="w-full h-[calc(100vh_-_56px)] fixed bottom-0 ">
        <Outlet />
      </main>
    </>
  );
};

export default BaseNav;
