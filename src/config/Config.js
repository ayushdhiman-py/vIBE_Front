import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDQzlCbUp59OjWmi1gm5RA8H70U5G4BPGU",
  authDomain: "vibe-d49d0.firebaseapp.com",
  databaseURL: "https://vibe-d49d0-default-rtdb.firebaseio.com",
  projectId: "vibe-d49d0",
  storageBucket: "vibe-d49d0.appspot.com",
  messagingSenderId: "777959759705",
  appId: "1:777959759705:web:8fca9d676f735099baf648",
  measurementId: "G-9KGTJV5297",
};

firebase.initializeApp(firebaseConfig);

const initializeAuthentication = () => {
  firebase.initializeApp(firebaseConfig);
};

const auth = firebase.auth();
const fs = firebase.firestore();
const storage = firebase.storage();

export { auth, fs, storage, initializeAuthentication };
