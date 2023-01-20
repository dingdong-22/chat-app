import { useState, useEffect } from "react";
import {
  collection,
  onSnapshot,
  query,
  limit,
  orderBy,
  where,
} from "firebase/firestore";

import { auth, db } from "../firebase";

function RoomSelector(props) {
  let [roomList, setRoomList] = useState([]);

  useEffect(() => {
    let roomsQuery = query(
      collection(db, "rooms"),
      where("public", "==", true)
    );

    onSnapshot(roomsQuery, (querySnapshot) => {
      setRoomList(querySnapshot.docs.map((doc) => doc.id));
    });
  }, []);

  return <div>Room List<br/>{roomList}</div>;
}

export default RoomSelector;
