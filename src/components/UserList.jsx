import { useState, useEffect } from "react";
import { db, auth } from "../firebase";

import { doc, getDoc } from "firebase/firestore";
import AddRemoveUsers from "./AddRemoveUsers";

function UserList(props) {
  let [users, setUsers] = useState([]);
  let [update, setUpdate] = useState(false);

  async function getUsers() {
    let roomsDoc = doc(db, `rooms/${props.room}`);
    let holder = [];
    let getRoomsDoc = await getDoc(roomsDoc).then((d) => {
      holder = d.data().users;
    });

    let holder2 = [];
    for (let x of holder) {
      let userDoc = doc(db, `users/${x}`);
      let temp = await getDoc(userDoc).then((d) => {
        holder2.push({
          uid: d.data().uid,
          photoURL: d.data().photoURL,
        });
      });
    }
    setUsers(holder2);
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
        {users.map(({ uid, photoURL }) => {
          console.log(uid, photoURL);
          return (
            <div key={uid} className="user-button-container">
              <button
                key={uid}
                className="user-button"
                value={uid}
                onClick={(e) => copyId(e.target.value)}
              >
                {uid}
                <img className="user-button-image" src={photoURL} alt="" />
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
