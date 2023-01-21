import { useState, useEffect } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";

import { auth, db } from "../firebase";

function RoomSelector(props) {
  let [roomList, setRoomList] = useState([]);
  useEffect(() => {
    let roomsQuery = query(
      collection(db, "rooms"),
      where("users", "array-contains", auth.currentUser.uid)
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
  //TODO Add room function
  return (
    <div className="room-selector-container">
      <div>Rooms</div>
      <div>{roomList}</div>
      <div>
        <button>Add room</button>
      </div>
    </div>
  );
}

export default RoomSelector;
