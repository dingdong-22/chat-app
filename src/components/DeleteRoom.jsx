import {
  doc,
  updateDoc,
} from "firebase/firestore";

import { auth, db } from "../firebase";

function DeleteRoom(props) {

  async function disableRoom() {
    let roomRef = doc(db, `rooms/${props.room}`);

    let temp = await updateDoc(roomRef, {
      up: false,
    });

    props.setRoom("BEZDE9Bg87EqeTpSwrbW");
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
