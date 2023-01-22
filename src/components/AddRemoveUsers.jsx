import { useState, useEffect } from "react";
import { db, auth } from "../firebase";

import {
  arrayUnion,
  doc,
  getDoc,
  updateDoc,
  arrayRemove,
} from "firebase/firestore";

function AddRemoveUsers(props) {
  let [userInput, setUserInput] = useState("");

  async function addOrRemoveUser(add) {
    console.log("Input:", userInput);

    //check if user exists
    let docRef = doc(db, `rooms/BEZDE9Bg87EqeTpSwrbW`);

    let exists = await getDoc(docRef).then((d) => {
      if (d.data().users.includes(userInput)) {
        return true;
      } else {
        return false;
      }
    });

    if (exists) {
      docRef = doc(db, `rooms/${props.room}`);
      if (add) {
        console.log("adding", userInput);
        let temp = await updateDoc(docRef, {
          users: arrayUnion(userInput),
        });
      } else {
        let temp = await updateDoc(docRef, {
          users: arrayRemove(userInput),
        });
      }
    }
    props.setUpdate(!props.update);
    setUserInput("");
  }

  return (
    <div>
      <input
        type="text"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
      />
      <button onClick={() => addOrRemoveUser(true)}>Add user</button>
      <button onClick={() => addOrRemoveUser(false)}>Remove user</button>
    </div>
  );
}

export default AddRemoveUsers;
