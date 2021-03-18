import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: ***REMOVED***,
  authDomain: ***REMOVED***,
  projectId: ***REMOVED***,
  storageBucket: ***REMOVED***,
  messagingSenderId: ***REMOVED***,
  appId: ***REMOVED***,
  measurementId: ***REMOVED***
};

export const db = firebase.initializeApp(firebaseConfig).firestore();

const { TimeStamp, GeoPoint } = firebase.firestore;
export { TimeStamp, GeoPoint };
