import "./App.css";

import { useAuthState } from "react-firebase-hooks/auth";

import { auth } from "./firebase";
import ChatRoom from "./components/ChatRoom";
import SignIn from "./components/SignIn";

function App() {
  let [user] = useAuthState(auth);

  return <div className="App">{user ? <ChatRoom /> : <SignIn />}</div>;
}

export default App;
