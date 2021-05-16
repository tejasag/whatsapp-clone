import { MdSearch } from "react-icons/md";
import { useEffect, useRef } from "react";
import { db, auth } from "../utils/firebase";
import { Icon } from "@chakra-ui/react";
import * as EmailValidator from "email-validator";
import { useAuthState } from "react-firebase-hooks/auth";

function SearchBar({ chatsSnapshot }) {
  const [user] = useAuthState(auth);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const onEnter = (e) => {
    if (e.key === "Enter") {
      let value = inputRef.current.value;
      if (!value || value.replaceAll(" ", "") === "") return null;
      if (
        !chatAlreadyExists(value) &&
        EmailValidator.validate(value) &&
        value !== user.email
      ) {
        db.collection("chats").add({
          users: [user.email, value],
        });
      }
      inputRef.current.value = "";
    }
  };

  const chatAlreadyExists = (recEmail) => {
    return !!chatsSnapshot?.docs.find(
      (chat) => chat.data().users.find((user) => user === recEmail)?.length > 0
    );
  };

  return (
    <div className="border-gray-700 border-b h-16  flex flex-row sticky ">
      <div className="flex z-10 items-center h-2/3 w-full mx-4 my-3 rounded-full bg-gray-500">
        <Icon as={MdSearch} w={6} h={6} color="gray.400" className={"ml-6"} />
        <input
          id="search"
          ref={inputRef}
          onKeyPress={onEnter}
          className="ml-5 bg-transparent z-10 text-white w-full focus:outline-none"
          type="text"
          placeholder="Search to start a new chat"
        />
      </div>
    </div>
  );
}

export default SearchBar;
