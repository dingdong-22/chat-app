import { useState } from "react";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { doc, updateDoc, arrayUnion, setDoc } from "firebase/firestore";

import { auth, db } from "../firebase";

function SignIn() {
  let [username, setUsername] = useState("");
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
    let docRef = doc(db, `users/${auth.currentUser.uid}`);
    if (username) {
      await setDoc(
        docRef,
        {
          uid: auth.currentUser.uid,
          photoURL: auth.currentUser.photoURL,
          username: username,
        },
        { merge: true }
      );
    } else {
      await setDoc(
        docRef,
        {
          uid: auth.currentUser.uid,
          photoURL: auth.currentUser.photoURL,
        },
        { merge: true }
      );
    }
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
      <input
        className="username-input"
        type="text"
        value={username}
        placeholder="Optional: Enter username"
        onChange={(e) => setUsername(e.target.value)}
      />
      <div>
        <button className="sign-in" onClick={() => signInWithGoogle()}>
          Sign in
        </button>
      </div>
    </div>
  );
}

export default SignIn;
