import { useState } from "react";

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

import { auth, db } from "../firebase";

function SendMessage() {
  let [message, setMessage] = useState("");

  async function sendMessage(e) {
    e.preventDefault();
    let { photoURL, uid } = auth.currentUser;

    await db.collection("messages").add({
      text: message,
      photoURL,
      uid,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
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
