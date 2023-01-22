import { useState, useEffect } from "react";
import { db, auth } from "../firebase";

import { doc, getDoc } from "firebase/firestore";
import AddRemoveUsers from "./AddRemoveUsers";

function UserList(props) {
  let [users, setUser] = useState([]);
  let [update, setUpdate] = useState(false);

  async function getUsers() {
    let roomsDoc = doc(db, `rooms/${props.room}`);
    let getRoomsDoc = await getDoc(roomsDoc).then((d) => {
      setUser(d.data().users);
    });
  }

  useEffect(() => {
    console.log("Getting users");
    getUsers();
  }, [props.room, update]);

  function copyId(id) {
    navigator.clipboard.writeText(id);
  }

  return (
    <div className="user-list-container">
      <div className="user-list-title">User List</div>
      <div className="user-container">
        {users.map((x) => {
          return (
            <div key={x} className="user-button-container">
              <button
                key={x}
                className="user-button"
                value={x}
                onClick={(e) => copyId(e.target.value)}
              >
                {x}
              </button>
            </div>
          );
        })}
      </div>
      <div>
        {props.isAdmin ? (
          <AddRemoveUsers
            room={props.room}
            update={update}
            setUpdate={setUpdate}
          />
        ) : null}
      </div>
    </div>
  );
}

export default UserList;
