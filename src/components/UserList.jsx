import { useState, useEffect } from "react";
import { db, auth } from "../firebase";

import { doc, getDoc } from "firebase/firestore";

function UserList(props) {
  let [users, setUser] = useState([]);

  async function getUsers() {
    let roomsDoc = doc(db, `rooms/${props.room}`);
    let getRoomsDoc = await getDoc(roomsDoc).then((d) => {
      setUser(d.data().users);
    });
  }
  useEffect(() => {
    getUsers();
  }, [props.room]);

  return (
    <div>
      User List
      <br />
      {users.map((x) => {
        return <div key={x}>{x}</div>;
      })}
    </div>
  );
}

export default UserList;
