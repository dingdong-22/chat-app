import { useState, useEffect } from "react";

import "firebase/compat/auth";
import "firebase/compat/firestore";

import { db } from "../firebase";
import SignOut from "./SignOut";
import SendMessage from "./SendMessage";

function ChatRoom() {
  let [messages, setMessages] = useState([]);

  useEffect(() => {
    db.collection("messages")
      .orderBy("createdAt")
      .limit(50)
      .onSnapshot((snapshot) =>
        setMessages(snapshot.docs.map((doc) => doc.data()))
      );
  }, []);

  return (
    <div>
      <SignOut />
      <div className="message-container">
        {messages.map(({ id, text, photoURL, uid }) => (
          <ChatMessage
            key={id}
            uniq={id}
            text={text}
            photoURL={photoURL}
            uid={uid}
          />
        ))}
      </div>
      <SendMessage />
    </div>
  );
}

function ChatMessage({ key, text, photoURL, uid }) {
  return (
    <div key={key} className={uid}>
      <img src={photoURL} alt=""></img>
      <p key={key}>{text}</p>
    </div>
  );
}

export default ChatRoom;
