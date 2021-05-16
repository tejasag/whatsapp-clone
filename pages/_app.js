import "../styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../utils/firebase";
import Login from "../components/Login";
import firebase from "firebase";
import { useEffect } from "react";
import { MobileView, BrowserView } from "react-device-detect";
import MobileWarning from "../components/MobileWarning";

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

  return (
    <>
      <BrowserView>
        {user ? (
          <ChakraProvider>
            <Component {...pageProps} />
          </ChakraProvider>
        ) : (
          <ChakraProvider>
            <Login loading={loading} />
          </ChakraProvider>
        )}
      </BrowserView>
     
      <MobileView>
        <MobileWarning />
      </MobileView>
      
    </>
  );
}

export default MyApp;
