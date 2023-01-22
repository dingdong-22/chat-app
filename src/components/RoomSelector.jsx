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
    console.log("Getting rooms");

    let roomsQuery = query(
      collection(db, "rooms"),
      where("users", "array-contains", auth.currentUser.uid),
      orderBy("public", "desc"),
      orderBy("createdAt")
    );

    onSnapshot(roomsQuery, (querySnapshot) => {
      setRoomList(
        querySnapshot.docs.map((doc) => {
          let currentClass = doc.id === props.room ? "current" : "";
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

  async function checkPublic(value) {
    let docRef = doc(db, `rooms/${value}`);
    let temp = await getDoc(docRef).then((d) => {
      if (d.data().public) {
        props.setIsPublic(true);
      } else {
        props.setIsPublic(false);
      }
    });
  }

  function changeRoom(value) {
    let allRooms = document.querySelectorAll(`.room-button`);
    for (let r of allRooms) {
      r.classList.remove("current");
    }
    props.setRoom(value);
    checkPublic(value);
    //dummy R as CSS does not allow ids with leading digit
    let newRoom = document.querySelector(`#R${value}`);
    newRoom.classList.add("current");
  }

  async function addRoom() {
    let colRef = collection(db, "rooms");
    console.log("Adding room");
    let newRoom = await addDoc(colRef, {
      users: [auth.currentUser.uid],
      public: false,
      createdAt: serverTimestamp(),
      admins: [auth.currentUser.uid],
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
      <div className="rooms-title">Rooms</div>
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
