import Head from "next/head";
import { Button, Spinner } from "@chakra-ui/react";
import { auth, provider } from "../utils/firebase";

function login({ loading }) {
  const signIn = () => {
    auth.signInWithPopup(provider).catch(alert);
  };

  if (loading) {
    return (
      <div
        style={{ backgroundColor: "#090e11" }}
        className="flex h-screen w-screen justify-center items-center flex-col"
      >
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      </div>
    );
  }

  return (
    <div>
      <Head>
        <title>Login</title>
      </Head>

      <div
        style={{ backgroundColor: "#090e11" }}
        className="flex h-screen w-screen justify-center items-center flex-col"
      >
        <img
          src="http://assets.stickpng.com/images/580b57fcd9996e24bc43c543.png"
          alt="Whatsapp"
          className="h-52 w-52 m-10"
        />
        <Button
          onClick={signIn}
          size="lg"
          colorScheme="teal"
          className="
          mb-10
        focus:outline-none
        focus:shadow-none
        active:border-none
        active:outline-none
        "
        >
          Login
        </Button>
      </div>
    </div>
  );
}

export default login;
