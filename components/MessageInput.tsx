import { Icon } from "@chakra-ui/react";
import { HiOutlineEmojiHappy } from "react-icons/hi";
import { AiOutlinePaperClip } from "react-icons/ai";
import { BsFillMicFill } from "react-icons/bs";
import { useEffect, useRef, useState } from "react";
import { db, auth } from "../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import firebase from "firebase";
import { useRouter } from "next/router";

function MessageInput({ scrollFn }) {
  const [user] = useAuthState(auth);
  const router = useRouter();

  const inputRef = useRef<HTMLInputElement | null>(null);

  let addMessage = (e) => {
    let id = router.query.id;
    if (e.key === "Enter") {
      let value = inputRef.current.value;
      if (!value || value.replaceAll(" ", "") === "") return null;
      db.collection("users").doc(user.uid).set(
        {
          lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
        },
        { merge: true }
      );
      db.collection("chats")
        .doc(id as string)
        .collection("messages")
        .add({
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          message: value,
          user: user.email,
          photoURL: user.photoURL,
        });
      inputRef.current.value = "";
      setTimeout(() => {
        scrollFn();
      }, 100);
    }
  };

  useEffect(() => {
    scrollFn();
  }, []);

  return (
    <div
      className="flex flex-row sticky w-full h-18"
      style={{ marginTop: "auto", backgroundColor: "#1f2528" }}
    >
      <Icon
        as={HiOutlineEmojiHappy}
        w={9}
        h={9}
        color="gray.500"
        className={"hover:cursor-pointer my-4 mx-4"}
      />
      <Icon
        as={AiOutlinePaperClip}
        w={9}
        h={9}
        color="gray.500"
        className={"my-4 mx-4 hover:cursor-pointer"}
      />
      <div
        style={{ backgroundColor: "#33393a" }}
        className="flex-1 h-2/3 my-3 rounded-full"
      >
        <input
          ref={inputRef}
          onKeyPress={addMessage}
          id="messageInput"
          type="text"
          placeholder="Type a message"
          className="active:bg-transparent my-3 ml-4 w-full pr-auto text-white focus:outline-none bg-transparent"
        />
      </div>
      <Icon
        as={BsFillMicFill}
        w={8}
        h={8}
        color="gray.500"
        className={"my-4 mx-4 hover:cursor-pointer"}
      />
    </div>
  );
}

export default MessageInput;
