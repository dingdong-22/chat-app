import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

let firebaseConfig = {
  apiKey: "AIzaSyDggM-oqT_sZJBW185DGVUasQKgqfzeoeY",
  authDomain: "chat-app-2a4cb.firebaseapp.com",
  projectId: "chat-app-2a4cb",
  storageBucket: "chat-app-2a4cb.appspot.com",
  messagingSenderId: "200802725894",
  appId: "1:200802725894:web:f11371fa6fb22ba04d1387",
  measurementId: "G-6Y6RW4FC4P",
};

let firebaseApp = initializeApp(firebaseConfig);

let auth = getAuth(firebaseApp);

let db = getFirestore(firebaseApp);

let defaultRoom = "BEZDE9Bg87EqeTpSwrbW"

export { auth, db, defaultRoom };
