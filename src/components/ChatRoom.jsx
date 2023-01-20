import { useState, useEffect } from "react";
import {
  collection,
  onSnapshot,
  query,
  limit,
  orderBy,
} from "firebase/firestore";

import { auth, db } from "../firebase";
import SignOut from "./SignOut";
import SendMessage from "./SendMessage";

function ChatRoom() {
  let [messages, setMessages] = useState([]);

  useEffect(() => {
    let messagesQuery = query(
      collection(db, "messages"),
      orderBy("createdAt"),
      limit(25)
    );

    onSnapshot(messagesQuery, (querySnapshot) => {
      setMessages(querySnapshot.docs.map((doc) => doc.data()));
    });
  }, []);

  return (
    <div className="chat-room">
      <SignOut />
      <div className="message-container">
        {messages.map(({ id, text, photoURL, uid }) => (
          <ChatMessage key={id} text={text} photoURL={photoURL} uid={uid} />
        ))}
      </div>
      <SendMessage />
    </div>
  );
}

function ChatMessage({ key, text, photoURL, uid }) {
  let messageClass = uid === auth.currentUser.uid ? "sent" : "recieved";
  return (
    <div key={key} className={`message ${messageClass}`}>
      <img className="message-photo" key={key} src={photoURL} alt=""></img>
      <p className="text" key={key}>
        {text}
      </p>
    </div>
  );
}

export default ChatRoom;
