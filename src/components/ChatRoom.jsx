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

import { auth, db } from "../firebase";
import SignOut from "./SignOut";
import SendMessage from "./SendMessage";
import RoomSelector from "./RoomSelector";
import UserList from "./UserList";

function ChatRoom() {
  let [messages, setMessages] = useState([]);
  let [room, setRoom] = useState("BEZDE9Bg87EqeTpSwrbW");
  let [isPublic, setIsPublic] = useState(true);
  let [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    let messagesQuery = query(
      collection(db, `rooms/${room}/messages`),
      orderBy("createdAt"),
      limit(25)
    );

    console.log("Chatroom Snap");
    onSnapshot(messagesQuery, (querySnapshot) => {
      setMessages(
        querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    });

    checkAdmin();
  }, [room]);

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

  // console.log("In Chatroom:", room);

  return (
    <div className="main-container">
      <RoomSelector room={room} setRoom={setRoom} setIsPublic={setIsPublic} />
      <div className="chat-room">
        <SignOut room={room} />
        <div className="message-container">
          {messages.map(({ id, text, photoURL, uid }) => {
            return (
              <ChatMessage key={id} text={text} photoURL={photoURL} uid={uid} />
            );
          })}
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
      <img className="message-photo" src={photoURL} alt=""></img>
      <p className="text">{text}</p>
    </div>
  );
}

export default ChatRoom;
