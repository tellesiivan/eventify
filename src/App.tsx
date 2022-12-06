import { onAuthStateChanged } from "firebase/auth";
import React from "react";
import { auth } from "./firebase/firebase.config";
import { useAppDispatch } from "./redux/reduxHooks";
import {
  addAuthUser,
  authIsLoading,
  resetAuthState,
} from "./redux/slices/authSlice";

import NavRoutes from "./routes";

function App() {
  const dispatch = useAppDispatch();
  onAuthStateChanged(auth, (user) => {
    dispatch(authIsLoading(true));

    if (user) {
      // User is signed in, see docs for a list of available properties
      const email = user.email;
      const userName = user.displayName;
      if (userName && email) {
        dispatch(
          addAuthUser({
            email,
            userName,
          })
        );
      }
      // ...
    } else {
      // User is signed out
      dispatch(resetAuthState());
    }
    dispatch(authIsLoading(false));
  });

  return <NavRoutes />;
}

export default App;
