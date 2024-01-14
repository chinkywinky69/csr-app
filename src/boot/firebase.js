import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCHBxlcNhi6kvI7SRo_MleXdc2hJPmCCvc",
  authDomain: "st-rita-app.firebaseapp.com",
  projectId: "st-rita-app",
  storageBucket: "st-rita-app.appspot.com",
  messagingSenderId: "936323774065",
  appId: "1:936323774065:web:9eed98c30efe99e4a70dd0",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth };
