import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

let firebaseConfig = {
  apiKey: "AIzaSyDggM-oqT_sZJBW185DGVUasQKgqfzeoeY",
  authDomain: "chat-app-2a4cb.firebaseapp.com",
  projectId: "chat-app-2a4cb",
  storageBucket: "chat-app-2a4cb.appspot.com",
  messagingSenderId: "200802725894",
  appId: "1:200802725894:web:f11371fa6fb22ba04d1387",
  measurementId: "G-6Y6RW4FC4P",
};

let firebaseApp = firebase.initializeApp(firebaseConfig);

let auth = firebase.auth();

let db = firebaseApp.firestore();

export { auth, db };
