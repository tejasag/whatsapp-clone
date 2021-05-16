import {
  Avatar,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { MdDonutLarge, MdChat } from "react-icons/md";
import { BsThreeDotsVertical } from "react-icons/bs";
import { auth, db } from "../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import firebase from "firebase";
import { useRouter } from "next/router";

function MenuBar() {
  const [user] = useAuthState(auth);
  const router = useRouter();
  const logoutUser = () => {
    auth.signOut();
    db.collection("users").doc(user.uid).set(
      {
        lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
      },
      { merge: true }
    );
  };

  return (
    <div
      style={{ backgroundColor: "#2b2f33" }}
      className="flex h-18 justify-between sticky"
    >
      <Avatar
        src={user?.photoURL}
        name={user?.displayName}
        onClick={e => {
          router.push("/");
        }}
        className="hover:cursor-pointer mx-5 my-4 justify-self-start"
      />
      <div>
        <Icon
          as={MdDonutLarge}
          w={7}
          h={7}
          color="gray.300"
          className={"my-6 mx-4"}
        />
        <Icon
          as={MdChat}
          w={7}
          h={7}
          color="gray.300"
          className={"my-6 mx-5"}
        />
        <Menu placement={"right"}>
          <MenuButton _focus={{ outline: "none" }}>
            <Icon
              as={BsThreeDotsVertical}
              w={7}
              h={7}
              color="gray.300"
              className={"focus:outline-none my-6 mx-3 mr-4"}
            />
          </MenuButton>
          <MenuList className={"z-20"}>
            <MenuItem _focus={{ outline: "none" }} onClick={logoutUser}>
              Logout
            </MenuItem>
          </MenuList>
        </Menu>
      </div>
    </div>
  );
}

export default MenuBar;
