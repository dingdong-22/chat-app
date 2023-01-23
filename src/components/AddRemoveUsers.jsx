import { useState, useEffect } from "react";
import { db } from "../firebase";

import {
  arrayUnion,
  doc,
  getDoc,
  updateDoc,
  arrayRemove,
} from "firebase/firestore";

function AddRemoveUsers({ room, update, setUpdate }) {
  let [userInput, setUserInput] = useState("");

  async function addOrRemoveUser(add) {
    //check if user exists
    let docRef = doc(db, `users/${userInput}`);
    let exists = await getDoc(docRef).then((d) => {
      if (d.exists()) {
        return true;
      } else {
        return false;
      }
    });

    if (exists) {
      docRef = doc(db, `rooms/${room}`);
      if (add) {
        console.log("adding", userInput);
        let addingUser = await updateDoc(docRef, {
          users: arrayUnion(userInput),
        });
      } else {
        let removingUser = await updateDoc(docRef, {
          users: arrayRemove(userInput),
        });
      }
    }
    setUpdate(!update);
    setUserInput("");
  }

  return (
    <div className="add-remove-container">
      <input
        className="add-remove-name"
        type="text"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
      />
      <div>
        <button
          className="add-remove-buttons"
          onClick={() => addOrRemoveUser(true)}
        >
          Add user
        </button>
        <button
          className="add-remove-buttons"
          onClick={() => addOrRemoveUser(false)}
        >
          Remove user
        </button>
        <button className="clear-button" onClick={() => setUserInput("")}>
          Clear
        </button>
      </div>
    </div>
  );
}

export default AddRemoveUsers;
