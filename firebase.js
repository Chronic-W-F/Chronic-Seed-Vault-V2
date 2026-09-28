import { initializeApp, getApps } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDtAKBVp6Hyf2eXv1Wo0YLuuE1hfZ80MgM",
  authDomain: "public-seed-vault-app.firebaseapp.com",
  projectId: "public-seed-vault-app",
  storageBucket: "public-seed-vault-app.appspot.com",
  messagingSenderId: "194363722248",
  appId: "1:194363722248:web:7ca20411d166c164089fbd",
  measurementId: "G-6DEP8JY9VP",
};

const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

export { app, auth, db, googleProvider };
