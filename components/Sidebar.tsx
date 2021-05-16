import MenuBar from "./MenuBar";
import SearchBar from "./SearchBar";
import ChatCard from "./ChatCard";
import { auth, db } from "../utils/firebase";
import { useCollection } from "react-firebase-hooks/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

function Sidebar({ chat, messages }) {
  const [user] = useAuthState(auth);
  const userChatRef = db
    .collection("chats")
    .where("users", "array-contains", user.email);
  const [chatsSnapshot] = useCollection(userChatRef);

  return (
    <div
      className={"w-1/3 h-full border-r border-gray-600"}
      style={{ backgroundColor: "#131d20" }}
    >
      <MenuBar />
      <SearchBar chatsSnapshot={chatsSnapshot} />

      {chatsSnapshot?.docs.map((chat) => {
        return (
          <ChatCard
            key={chat.data().users}
            time="10pm"
            users={chat.data().users}
            id={chat.id}
            messages={messages}
          />
        );
      })}
    </div>
  );
}

export default Sidebar;
