import { auth } from "../firebase";

function SignOut() {
  return (
    <div>
      <button onClick={() => auth.signOut()}>Sign Out</button>
    </div>
  );
}

export default SignOut;
