import { auth } from "@simplimods/firebase";
import {
  addAuthUser,
  authIsLoading,
  resetAuthState,
  useAppDispatch,
} from "@simplimods/redux";
import { onAuthStateChanged } from "firebase/auth";
import React from "react";

import NavRoutes from "./routes";

function App() {
  const dispatch = useAppDispatch();
  dispatch(authIsLoading(true));
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      const email = user.email;
      const userName = user.displayName;
      const uid = user.uid;
      if (userName && email) {
        dispatch(
          addAuthUser({
            email,
            userName,
            uid,
          })
        );
        dispatch(authIsLoading(false));
      }
      // ...
    } else {
      // User is signed out
      dispatch(resetAuthState());
      dispatch(authIsLoading(false));
    }
  });

  return <NavRoutes />;
}

export default App;
