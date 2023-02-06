import { auth, db } from "../firebase";

import {
  arrayUnion,
  doc,
  getDoc,
  updateDoc,
  arrayRemove,
} from "firebase/firestore";

function AddRemoveUsers({ room, update, setUpdate, userInput, setUserInput }) {
  async function addOrRemoveUser(add) {
    if (userInput === auth.currentUser.uid) {
      setUserInput("");
      return;
    }

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
        placeholder="Enter user id"
        onChange={(e) => setUserInput(e.target.value)}
      />
      <div className="add-remove-clear-buttons-container">
        <div className="add-remove-buttons-container">
          <button
            className="add-button"
            onClick={() => addOrRemoveUser(true)}
          >
            Add user
          </button>
          <button
            className="remove-button"
            onClick={() => addOrRemoveUser(false)}
          >
            Remove user
          </button>
        </div>
        <div className="clear-button-container">
          <button className="clear-button" onClick={() => setUserInput("")}>
            Clear
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddRemoveUsers;
