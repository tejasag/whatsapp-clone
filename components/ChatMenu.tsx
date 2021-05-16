import { Avatar, Icon } from "@chakra-ui/react";
import { MdSearch } from "react-icons/md";
import { BsThreeDotsVertical } from "react-icons/bs";
import { auth } from "../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import TimeAgo from "timeago-react";

function ChatMenu({ name, email, avatar, rec }) {
  const [user] = useAuthState(auth);

  return (
    <>
      <div
        style={{ backgroundColor: "#2b2f33" }}
        className="flex h-18 justify-between flex-row"
      >
        <div className="flex flex-row">
          <Avatar
            className="mx-5 my-4 justify-self-start"
            src={avatar}
            name={name}
          />
          <div
            className="flex flex-col my-4 justify-center"
            style={{ flexDirection: "column" }}
          >
            <h2 className="text-white text-lg">{email}</h2>
            {rec ? (
              <span className="text-gray-400 text-sm">
                Last active <TimeAgo datetime={rec?.lastSeen?.toDate()} />
              </span>
            ) : (
              <></>
            )}
          </div>
        </div>
        <div>
          <Icon
            as={MdSearch}
            w={7}
            h={7}
            color="gray.300"
            className={"my-6 mx-4"}
          />
          <Icon
            as={BsThreeDotsVertical}
            w={7}
            h={7}
            color="gray.300"
            className={"my-6 mx-3 mr-4"}
          />
        </div>
      </div>
    </>
  );
}

export default ChatMenu;
