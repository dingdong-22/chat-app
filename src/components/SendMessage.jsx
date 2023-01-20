import { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

import { auth, db } from "../firebase";

function SendMessage() {
  let [message, setMessage] = useState("");

  async function sendMessage(e) {
    e.preventDefault();
    let colRef = collection(db, "messages");

    let { photoURL, uid } = auth.currentUser;

    await addDoc(colRef, {
      text: message,
      photoURL,
      uid,
      createdAt: serverTimestamp(),
    });

    setMessage("");
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
