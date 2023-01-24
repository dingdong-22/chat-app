import { doc, updateDoc } from "firebase/firestore";

import { db, defaultRoom } from "../firebase";

function DeleteRoom({ room, setRoom }) {
  async function disableRoom() {
    let docRef = doc(db, `rooms/${room}`);
    let disablingRoom = await updateDoc(docRef, {
      disabled: true,
    });

    setRoom(defaultRoom);
  }

  return (
    <div className="delete-room-container">
      <button className="delete-room-button" onClick={() => disableRoom()}>
        Delete Room
      </button>
    </div>
  );
}

export default DeleteRoom;
