import { useAuthState } from "react-firebase-hooks/auth";
import Base from "../../components/Base";
import { auth, db } from "../../utils/firebase";
import firebase from "firebase";

function UserChat({ chat, messages }) {
  const [user] = useAuthState(auth);
  return (
    <div
      className={"h-screen w-screen home"}
      style={{ backgroundColor: "#090e11" }}
    >
      <Base key={user.email} inChat={true} chat={chat} messages={messages} />
    </div>
  );
}

export async function getServerSideProps(context) {
  const ref = db.collection("chats").doc(context.query.id);

  const messageRes = await ref
    .collection("messages")
    .orderBy("timestamp", "asc")
    .get();

  interface Message {
    id: string;
    timestamp: any;
  }

  const messages = messageRes.docs
    .map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
    .map((msg: Message) => ({
      ...msg,
      timestamp: msg.timestamp.toDate().getTime(),
    }));

  const chatRes = await ref.get();
  const chat = {
    id: chatRes.id,
    ...chatRes.data(),
  };

  return {
    props: {
      messages: JSON.stringify(messages),
      chat: chat,
    },
  };
}

export default UserChat;
