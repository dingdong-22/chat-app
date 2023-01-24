import { useState, useEffect } from "react";
import { db } from "../firebase";

import { doc, getDoc } from "firebase/firestore";
import AddRemoveUsers from "./AddRemoveUsers";

function UserList({ room, isPublic, isAdmin }) {
  let [users, setUsers] = useState([]);
  let [update, setUpdate] = useState(false);
  let [userInput, setUserInput] = useState("");

  async function getUsers() {
    let docRef = doc(db, `rooms/${room}`);
    let holder = [];
    let gettingUsers = await getDoc(docRef).then((d) => {
      holder = d.data().users;
    });

    let holder2 = [];
    for (let x of holder) {
      let docRef = doc(db, `users/${x}`);
      let gettingUserData = await getDoc(docRef).then((d) => {
        holder2.push({
          uid: d.data().uid,
          photoURL: d.data().photoURL,
          username: d.data().username,
        });
      });
    }
    setUsers(holder2);
  }

  useEffect(() => {
    getUsers();
  }, [room, update]);

  function copyId(id) {
    navigator.clipboard.writeText(id);
    setUserInput(id);
  }

  return (
    <div className="user-list-container">
      <div className="user-list-title">User List</div>
      <div className="user-container">
        {users.map(({ uid, photoURL, username }) => {
          return (
            <div key={uid} className="user-button-container">
              <button
                key={uid}
                className="user-button"
                value={uid}
                onClick={(e) => copyId(e.target.value)}
              >
                {username ? username : uid}
                <img className="user-button-image" src={photoURL} alt="" />
              </button>
            </div>
          );
        })}
      </div>
      <div>
        {isAdmin ? (
          <AddRemoveUsers
            room={room}
            update={update}
            setUpdate={setUpdate}
            userInput={userInput}
            setUserInput={setUserInput}
          />
        ) : null}
      </div>
    </div>
  );
}

export default UserList;
