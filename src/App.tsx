import { onAuthStateChanged } from "firebase/auth";
import React from "react";
import { auth } from "./firebase.config";
import { useAppDispatch } from "./redux/reduxHooks";
import { addAuthUser, authIsLoading } from "./redux/slices/authSlice";

import NavRoutes from "./routes";

function App() {
  const dispatch = useAppDispatch();
  onAuthStateChanged(auth, (user) => {
    dispatch(authIsLoading(true));

    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      const uid = user.uid;
      const email = user.email;
      if (uid && email) {
        dispatch(
          addAuthUser({
            email,
            userName: "",
          })
        );
      }
      // ...
      dispatch(authIsLoading(false));
    } else {
      // User is signed out
      // ...
      dispatch(authIsLoading(false));
    }
  });

  return <NavRoutes />;
}

export default App;
