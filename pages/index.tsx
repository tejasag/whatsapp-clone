import Head from "next/head";
import Base from "../components/Base";
import { db } from "../utils/firebase";

export default function Home({ messages }) {
  return (
    <div className={"h-screen w-screen home"} style={{backgroundColor: "#090e11"}}>
      <Head>
        <title>Whatsapp Clone</title>
      </Head>

      <Base inChat={false} />
    </div>
  );
}
