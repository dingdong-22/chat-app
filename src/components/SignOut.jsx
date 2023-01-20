import { auth } from "../firebase";

function SignOut() {
  return (
    <div className="sign-out-container">
      <button className="sign-out" onClick={() => auth.signOut()}>
        Sign Out
      </button>
    </div>
  );
}

export default SignOut;
