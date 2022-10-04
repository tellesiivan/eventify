import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDPPLF7lbGm1qYgFT_X5lJEnbLdXFs_asI",
  authDomain: "eventify-ccc96.firebaseapp.com",
  projectId: "eventify-ccc96",
  storageBucket: "eventify-ccc96.appspot.com",
  messagingSenderId: "995181230664",
  appId: "1:995181230664:web:0b338f8b0f9b27f2b9367d",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const firestore = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { app, auth, firestore, storage, firebaseConfig };
