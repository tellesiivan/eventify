import NavRoutes from "./routes";

import { Box, SkeletonCircle, SkeletonText } from "@chakra-ui/react";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase.config";

function App() {
  return <NavRoutes />;
}

export default App;
