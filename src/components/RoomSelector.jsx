import { useState, useEffect } from "react";
import {
  collection,
  onSnapshot,
  query,
  where,
  addDoc,
  serverTimestamp,
  orderBy,
  doc,
  getDoc,
} from "firebase/firestore";

import { auth, db } from "../firebase";

function RoomSelector(props) {
  let [roomList, setRoomList] = useState([]);

  useEffect(() => {
    let roomsQuery = query(
      collection(db, "rooms"),
      where("users", "array-contains", auth.currentUser.uid),
      orderBy("public", "desc"),
      orderBy("createdAt")
    );

    onSnapshot(roomsQuery, (querySnapshot) => {
      setRoomList(
        querySnapshot.docs.map((doc) => {
          return (
            <button
              key={doc.id}
              value={doc.id}
              onClick={(e) => changeRoom(e.target.value)}
            >
              {doc.id}
            </button>
          );
        })
      );
    });
  }, []);

  async function checkPublic(value) {
    let docRef = doc(db, `rooms/${value}`);
    let temp = await getDoc(docRef).then((d) => {
      if (d.data().public) {
        props.setIsPublic(true)
      } else {
        props.setIsPublic(false)
      }
    });
  }

  function changeRoom(value) {
    props.setRoom(value);
    checkPublic(value)
  }

  async function addRoom() {
    let colRef = collection(db, "rooms");
    console.log("Adding room");
    let newRoom = await addDoc(colRef, {
      users: [auth.currentUser.uid],
      public: false,
      createdAt: serverTimestamp(),
    });

    let addMessage = await addDoc(
      collection(db, "rooms", newRoom.id, "messages"),
      {
        text: "Created",
        createdAt: serverTimestamp(),
      }
    );
  }

  return (
    <div className="room-selector-container">
      <div>Rooms</div>
      <div>{roomList}</div>
      <div>
        <button onClick={() => addRoom()}>Add room</button>
      </div>
    </div>
  );
}

export default RoomSelector;
