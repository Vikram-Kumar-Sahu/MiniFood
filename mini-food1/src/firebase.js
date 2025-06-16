import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDNzewmAfv8wEoncAAaGgohG_2BoqFGegQ",
  authDomain: "app-d0512.firebaseapp.com",
  projectId: "app-d0512",
  storageBucket: "app-d0512.firebasestorage.app",
  messagingSenderId: "115670571429",
  appId: "1:115670571429:web:b9ac6a472c80a2e200f04c",
  databaseURL: "https://app-d0512-default-rtdb.firebaseio.com"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);