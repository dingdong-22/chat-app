import { useState, useEffect } from "react";
import { db, auth } from "../firebase";

import { doc, getDoc } from "firebase/firestore";

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
    getUsers();
  }, [props.room]);

  //TODO
  async function addUser(e) {
    e.preventDefault();
    console.log("Adding", userInput);
    setUserInput("");
  }

  return (
    <div className="user-list-container">
      <div>User List</div>
      <div>
        {users.map((x) => {
          return <div key={x}>{x}</div>;
        })}
      </div>
      <div>
        <form onSubmit={(e) => addUser(e)}>
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
          />
          <button type="submit">Add user</button>
        </form>
      </div>
    </div>
  );
}

export default UserList;
