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
import DeleteRoom from "./DeleteRoom";

function RoomSelector({ room, setRoom, setIsPublic, isAdmin }) {
  let [roomList, setRoomList] = useState([]);

  //display rooms that the current user has access to
  useEffect(() => {
    let roomsQuery = query(
      collection(db, "rooms"),
      where("users", "array-contains", auth.currentUser.uid),
      where("up", "==", true),
      orderBy("public", "desc"),
      orderBy("createdAt")
    );

    onSnapshot(roomsQuery, (querySnapshot) => {
      setRoomList(
        querySnapshot.docs.map((doc) => {
          let currentClass = doc.id === room ? "current" : "";
          return (
            <div key={doc.id} className="room-button-container">
              <button
                key={doc.id}
                id={`R${doc.id}`}
                className={`room-button ${currentClass}`}
                value={doc.id}
                onClick={(e) => changeRoom(e.target.value)}
              >
                {doc.id}
              </button>
            </div>
          );
        })
      );
    });
  }, []);

  function changeRoom(value) {
    let allRooms = document.querySelectorAll(`.room-button`);
    for (let r of allRooms) {
      r.classList.remove("current");
    }
    setRoom(value);
    checkPublic(value);
    //dummy R as CSS does not allow ids with leading digit
    let newRoom = document.querySelector(`#R${value}`);
    newRoom.classList.add("current");
  }

  async function addRoom() {
    let colRef = collection(db, "rooms");
    let newRoom = await addDoc(colRef, {
      users: [auth.currentUser.uid],
      public: false,
      createdAt: serverTimestamp(),
      admins: [auth.currentUser.uid],
      up: true,
    });

    let addMessage = await addDoc(
      collection(db, "rooms", newRoom.id, "messages"),
      {
        text: "Created New Room",
        createdAt: serverTimestamp(),
      }
    );
  }

  async function checkPublic(value) {
    let docRef = doc(db, `rooms/${value}`);
    let temp = await getDoc(docRef).then((d) => {
      if (d.data().public) {
        setIsPublic(true);
      } else {
        setIsPublic(false);
      }
    });
  }

  return (
    <div className="room-selector-container">
      <div className="rooms-title">
        Rooms
        {isAdmin ? <DeleteRoom room={room} setRoom={setRoom} /> : null}
      </div>
      <div className="room-container">{roomList}</div>
      <div>
        <button className="add-room-button" onClick={() => addRoom()}>
          Add room
        </button>
      </div>
    </div>
  );
}

export default RoomSelector;
