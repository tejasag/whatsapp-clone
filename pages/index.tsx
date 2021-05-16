import Head from "next/head";
import Base from "../components/Base";
import { db } from "../utils/firebase";

export default function Home({ messages }) {
  return (
    <div className={"h-screen w-screen home"} style={{backgroundColor: "#090e11"}}>
      <Head>
        <title>Whatsapp Clone</title>
      </Head>

      <Base inChat={false} messages={messages} />
    </div>
  );
}
export async function getServerSideProps(context) {
  const ref = db.collection("chats").doc(context.query.id);

  const messageRes = await ref
    .collection("messages")
    .orderBy("timestamp", "asc")
    .get();

  const messages = messageRes.docs
    .map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
    .map((msg) => ({
      ...msg,
      timestamp: msg.timestamp.toDate().getTime(),
    }));

  return {
    props: {
      messages: JSON.stringify(messages),
    },
  };
}