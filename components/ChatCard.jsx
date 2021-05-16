import { Avatar } from "@chakra-ui/react";
import { auth, db } from "../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { getRecipientEmail } from "../utils/getRecipientEmail";
import { useCollection } from "react-firebase-hooks/firestore";
import { useRouter } from "next/router";

function ChatCard({ id, time, users }) {
  const [user] = useAuthState(auth);
  let reciepientEmail = getRecipientEmail(users, user);
  const [reciepientSnapshot] = useCollection(
    db.collection("users").where("email", "==", reciepientEmail)
  );

  const router = useRouter();
  const enterChat = () => {
    router.push(`/chat/${id}`);
  };

  const reciepient = reciepientSnapshot?.docs?.[0]?.data();

  return (
    <div
      onClick={enterChat}
      className="flex flex-row px-4 pt-4 max-h-26 h-26 hover:bg-gray-600 hover:cursor-pointer"
    >
      <Avatar
        src={reciepient?.avatar}
        name={reciepientEmail[0]}
        className="mt-1"
      />
      <div className="items-center flex my-auto ml-5 mt-1 h-full w-full border-b border-gray-600 pb-2">
          <h3 className="h-full text-gray-200 py-3 overflow-hidden">
            {getRecipientEmail(users, user)}
          </h3>
      </div>
    </div>
  );
}

export default ChatCard;
