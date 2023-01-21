// This is just a helper to add the type to the db responses
import {
  collection,
  CollectionReference,
  DocumentData,
} from "firebase/firestore";
import { firestoreDb } from "@simplimods/firebase";
import { CombineUserProfileInformation, UserSettings } from "@simplimods/types";

const createCollection = <T = DocumentData>(initialCollectionName: string) => {
  return collection(
    firestoreDb,
    initialCollectionName
  ) as CollectionReference<T>;
};

export const userProfile =
  createCollection<CombineUserProfileInformation>("memberGraph");
export const userSettings = createCollection<UserSettings>("memberGraph");
