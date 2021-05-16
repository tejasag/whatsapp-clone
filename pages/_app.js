import "../styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../utils/firebase";
import Login from "../components/Login";
import firebase from "firebase";
import { useEffect } from "react";

export const apiKey = process.env.API_KEY;
// console.log()

function MyApp({ Component, pageProps }) {
  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    if (user) {
      db.collection("users").doc(user.uid).set(
        {
          email: user.email,
          lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
          avatar: user.photoURL,
        },
        { merge: true }
      );
    }
  }, [user]);

  if (!user)
    return (
      <ChakraProvider>
        <Login loading={loading} />
      </ChakraProvider>
    );

  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
