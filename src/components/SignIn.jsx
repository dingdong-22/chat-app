import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";

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

  function signInWithGoogle() {
    let provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then(() => defaultRooms())
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
