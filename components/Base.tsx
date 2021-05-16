import Sidebar from "./Sidebar";
import ChatArea from "./ChatArea";
import { useCollection } from "react-firebase-hooks/firestore";
import { auth, db } from "../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Instructions from "./Instructions";

interface BaseProps {
  chat?: any;
  messages?: any;
  inChat: boolean;
}

const Base: React.FC<BaseProps> = ({ inChat, chat, messages}) => {
  let [user] = useAuthState(auth);
  const userChatRef = db
    .collection("chats")
    .where("users", "array-contains", user.email);
  const [chatsSnapshot] = useCollection(userChatRef);

  return (
    <div className={"grid place-items-center h-screen"}>
      <div
        className="flex flex-row overflow-hidden"
        style={{ maxHeight: "95vh", height: "95vh", width: "88%" }}
      >
        <Sidebar />
        {inChat ? (
          <ChatArea chat={chat} messages={messages} />
        ) : (
          <Instructions />
        )}
      </div>
    </div>
  );
};

export default Base;
