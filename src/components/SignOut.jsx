import { signOut } from "firebase/auth";

import { auth } from "../firebase";

function SignOut(props) {
  return (
    <div className="chat-top-row-container">
      <p className="room-id">{props.room}</p>
      <button className="sign-out" onClick={() => signOut(auth)}>
        Sign Out
      </button>
    </div>
  );
}

export default SignOut;
