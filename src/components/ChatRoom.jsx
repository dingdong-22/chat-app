import { useState, useEffect } from "react";
import {
  collection,
  onSnapshot,
  query,
  limit,
  orderBy,
  getDoc,
  doc,
} from "firebase/firestore";

import { auth, db, defaultRoom } from "../firebase";
import SignOut from "./SignOut";
import SendMessage from "./SendMessage";
import RoomSelector from "./RoomSelector";
import UserList from "./UserList";

function ChatRoom() {
  let [messages, setMessages] = useState([]);
  let [room, setRoom] = useState(defaultRoom);
  let [isPublic, setIsPublic] = useState(true);
  let [isAdmin, setIsAdmin] = useState(false);

  //display messages of current room
  useEffect(() => {
    let messagesQuery = query(
      collection(db, `rooms/${room}/messages`),
      orderBy("createdAt"),
      limit(25)
    );

    onSnapshot(messagesQuery, (querySnapshot) => {
      setMessages(
        querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    });

    checkAdmin();
  }, [room]);

  //check if user is a admin of the current room
  async function checkAdmin() {
    let docRef = doc(db, `rooms/${room}`);
    console.log("checking admin for room", room);
    await getDoc(docRef).then((d) => {
      let admins = d.data().admins;
      if (admins.includes(auth.currentUser.uid)) {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    });
  }

  return (
    <div className="main-container">
      <RoomSelector
        room={room}
        setRoom={setRoom}
        setIsPublic={setIsPublic}
        isAdmin={isAdmin}
      />
      <div className="chat-room">
        <SignOut room={room} />
        <div className="message-container">
          {messages.map(({ id, text, photoURL, uid }) => {
            return (
              <ChatMessage key={id} text={text} photoURL={photoURL} uid={uid} />
            );
          })}
          <div id="anchor"></div>
        </div>
        <SendMessage room={room} />
      </div>
      <UserList room={room} isPublic={isPublic} isAdmin={isAdmin} />
    </div>
  );
}

function ChatMessage({ text, photoURL, uid }) {
  let messageClass = uid === auth.currentUser.uid ? "sent" : "received";
  return (
    <div className={`message ${messageClass}`}>
      <div className="message-image">
        <img
          className="message-photo"
          onClick={() => {
            navigator.clipboard.writeText(uid);
          }}
          src={photoURL}
          alt=""
        ></img>
      </div>
      <div className={`message-text ${messageClass}`}>
        <p className="text">{text}</p>
      </div>
    </div>
  );
}

export default ChatRoom;
