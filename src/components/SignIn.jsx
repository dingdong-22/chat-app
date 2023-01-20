import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

import { auth } from "../firebase";

function SignIn() {
  function signInWithGoogle() {
    let provider = new firebase.auth.GoogleAuthProvider();
    return auth.signInWithPopup(provider);
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
