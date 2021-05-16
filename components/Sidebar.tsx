import MenuBar from "./MenuBar";
import SearchBar from "./SearchBar";
import ChatCard from "./ChatCard";
import { auth, db } from "../utils/firebase";
import { useCollection } from "react-firebase-hooks/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

function Sidebar() {
  const [user] = useAuthState(auth);
  const userChatRef = db
    .collection("chats")
    .where("users", "array-contains", user.email);
  const [chatsSnapshot] = useCollection(userChatRef);

  return (
    <div
      className={"w-1/3 h-full border-r overflow-y-scroll scrollbar-hide border-gray-600"}
      style={{
        backgroundColor: "#131d20",
        maxHeight: "100vh",
        height: "95vh",
      }}
    >
      <MenuBar />
      <SearchBar chatsSnapshot={chatsSnapshot} />

      <div
        className="overflow-y-scroll scrollbar-hide"
        style={{ maxHeight: "90vh" }}
      >
        <div>
          {chatsSnapshot?.docs.map((chat) => {
            return (
              <ChatCard
                key={chat.data().users}
                time="10pm"
                users={chat.data().users}
                id={chat.id}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
