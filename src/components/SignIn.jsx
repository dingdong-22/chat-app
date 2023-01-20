import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";

import { auth } from "../firebase";

function SignIn() {
  function signInWithGoogle() {
    let provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
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
