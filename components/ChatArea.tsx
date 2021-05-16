import Message from "./Message";
import { Box } from "@chakra-ui/react";
import ChatMenu from "./ChatMenu";
import MessageInput from "./MessageInput";
import { auth, db } from "../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import { useCollection } from "react-firebase-hooks/firestore";
import { getRecipientEmail } from "../utils/getRecipientEmail";
import React, { LegacyRef } from "react";

function ChatArea({ chat, messages }) {
  const [user] = useAuthState(auth);
  const router = useRouter();

  let recEmail = getRecipientEmail(chat.users, user);
  const [recSnapshot] = useCollection(
    db.collection("users").where("email", "==", recEmail)
  );
  const reciepient = recSnapshot?.docs?.[0]?.data();

  const endOfMessagesRef = React.useRef<HTMLDivElement | null>(null);
  const scroll = () => {
    endOfMessagesRef.current.scrollIntoView({
      block: "start",
      inline: "nearest",
    });
  };

  const [messageSnapshot] = useCollection(
    db
      .collection("chats")
      .doc(router.query.id as string)
      .collection("messages")
      .orderBy("timestamp", "asc")
  );
  const showMessages = () => {
    if (messageSnapshot) {
      scroll();
      let a = messageSnapshot.docs.map((message) => (
        <Message
          key={message.id}
          user={message.data().user}
          message={{
            ...message.data(),
            timestamp: message.data().timestamp?.toDate().getTime(),
          }}
        />
      ));
      return a;
    } else {
      return JSON.parse(messages).map((message) => {
        return (
          <Message key={message.id} user={message.user} message={message} />
        );
      });
    }
  };


  return (
    <div
      className="w-2/3 flex flex-col"
      style={{ maxHeight: "100vh", height: "95vh", backgroundColor: "#0d1418" }}
    >
      <ChatMenu
        email={recEmail}
        avatar={reciepient?.avatar || null}
        name={reciepient?.displayName || recEmail}
        rec={reciepient}
      />

      <div
        style={{ flexDirection: "column" }}
        className="chatScreen flex flex-col h-full overflow-y-scroll scrollbar-hide"
      >
        {showMessages()}
        <div ref={endOfMessagesRef} />
      </div>

      <MessageInput scrollFn={scroll} />
      <Box
        bgPosition="center"
        bgRepeat="repeat"
        opacity="0.3"
        className={"top-0 left-0"}
      />
    </div>
  );
}

export default ChatArea;
