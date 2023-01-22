import { useState, useEffect } from "react";
import { db, auth } from "../firebase";

import { arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";

function UserList(props) {
  let [users, setUser] = useState([]);
  let [userInput, setUserInput] = useState("");

  async function getUsers() {
    let roomsDoc = doc(db, `rooms/${props.room}`);
    let getRoomsDoc = await getDoc(roomsDoc).then((d) => {
      setUser(d.data().users);
    });
  }

  useEffect(() => {
    console.log("Getting users");
    getUsers();
  }, [props.room]);

  async function addUser(e) {
    e.preventDefault();
    console.log("Adding", userInput);
    let docRef = doc(db, `rooms/${props.room}`);
    let temp = await updateDoc(docRef, {
      users: arrayUnion(userInput),
    });

    setUserInput("");
  }

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
        {props.isPublic ? null : (
          <form onSubmit={(e) => addUser(e)}>
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
            />
            <button type="submit">Add user</button>
          </form>
        )}
      </div>
    </div>
  );
}

export default UserList;
