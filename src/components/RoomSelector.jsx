import { useState, useEffect } from "react";
import {
  collection,
  onSnapshot,
  query,
  where,
  addDoc,
  serverTimestamp,
  orderBy,
} from "firebase/firestore";

import { auth, db } from "../firebase";

function RoomSelector(props) {
  let [roomList, setRoomList] = useState([]);
  useEffect(() => {
    let roomsQuery = query(
      collection(db, "rooms"),
      where("users", "array-contains", auth.currentUser.uid),
      orderBy("public", "desc")
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

  function changeRoom(value) {
    props.setRoom(value);
  }

  async function addRoom() {
    let colRef = collection(db, "rooms");

    let newRoom = await addDoc(colRef, {
      users: [auth.currentUser.uid],
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
