import { signOut } from "firebase/auth";

import { auth } from "../firebase";

function SignOut() {
  return (
    <div className="sign-out-container">
      <button className="sign-out" onClick={() => signOut(auth)}>
        Sign Out
      </button>
    </div>
  );
}

export default SignOut;
