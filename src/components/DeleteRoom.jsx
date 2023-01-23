import { doc, updateDoc } from "firebase/firestore";

import { db, defaultRoom } from "../firebase";

function DeleteRoom({ room, setRoom }) {
  async function disableRoom() {
    let docRef = doc(db, `rooms/${room}`);
    let disablingRoom = await updateDoc(docRef, {
      up: false,
    });

    setRoom(defaultRoom);
  }

  return (
    <div>
      <button className="delete-room-button" onClick={() => disableRoom()}>
        Delete Room
      </button>
    </div>
  );
}

export default DeleteRoom;
