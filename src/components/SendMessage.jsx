import { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

import { auth, db } from "../firebase";

function SendMessage(props) {
  let [message, setMessage] = useState("");

  async function sendMessage(e) {
    e.preventDefault();
    let colRef = collection(db, `rooms/${props.room}/messages`);

    let { photoURL, uid } = auth.currentUser;

    let temp = await addDoc(colRef, {
      text: message,
      photoURL,
      uid,
      createdAt: serverTimestamp(),
    });
    setMessage("");
    let anchor = document.getElementById("anchor");
    anchor.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div className="send-message-container">
      <form onSubmit={sendMessage}>
        <input
          className="message-input"
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button className="submit-message-button" type="submit">
          Send
        </button>
      </form>
    </div>
  );
}

export default SendMessage;
