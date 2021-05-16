import firebase from "firebase";

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: "tejasag-whatsapp-clone.firebaseapp.com",
  projectId: "tejasag-whatsapp-clone",
  storageBucket: "tejasag-whatsapp-clone.appspot.com",
  messagingSenderId: "261807585172",
  appId: "1:261807585172:web:1febe2e6b3fbbb0eae4181",
  measurementId: "G-54XZV2T0TK",
};

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();


const db = app.firestore();
const auth = app.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider };