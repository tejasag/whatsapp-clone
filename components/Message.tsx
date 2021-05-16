import { auth } from "../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import moment from "moment";

function Message({ user, message }) {
  const [loggedInUser] = useAuthState(auth);
  let userSent = loggedInUser.email === user;

  return (
    <div>
      <h1
        style={{
          width: "fit-content",
          padding: ".75rem 1.5rem .75rem 1.5rem",
          borderRadius: "15px",
          marginLeft: userSent ? "auto" : "",
          maxWidth: "500px",
        }}
        className={`${
          userSent ? "bg-green-500 ml-auto" : "bg-gray-700"
        } text-white my-3 mx-10 text-md`}
      >
        {message.message}
        <p className="text-xs text-gray-200 ml-3 pt-1/2 pr-3 text-right right-0">
          {message.timestamp ? moment(message.timestamp).format("LT") : ""}
        </p>
      </h1>
    </div>
  );
}

export default Message;
