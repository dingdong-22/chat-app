import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import {
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  setDoc,
} from "firebase/firestore";

import { auth, db } from "../firebase";

function SignIn() {
  let publicRooms = ["BEZDE9Bg87EqeTpSwrbW", "UUjqwU3MRxq0jE5AhnsY"];

  async function defaultRooms() {
    for (let room of publicRooms) {
      let docRef = doc(db, "rooms", room);
      await updateDoc(docRef, {
        users: arrayUnion(auth.currentUser.uid),
      });
    }
  }

  async function userDetails() {
    let colRef = doc(db, `users/${auth.currentUser.uid}`);
    //maybe add user name here too
    await setDoc(colRef, {
      uid: auth.currentUser.uid,
      photoURL: auth.currentUser.photoURL,
    });
  }

  function signInWithGoogle() {
    let provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then(() => defaultRooms())
      .then(() => userDetails())
      .catch((error) => console.log(error));
  }

  return (
    <div className="sign-in-container">
      <button className="sign-in" onClick={() => signInWithGoogle()}>
        Sign in
      </button>
    </div>
  );
}

export default SignIn;
