// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA6y3LwoVQX6f8-GQEftMxIllSSb0HYZJg",
  authDomain: "foodorderingapp-2c778.firebaseapp.com",
  projectId: "foodorderingapp-2c778",
  storageBucket: "foodorderingapp-2c778.firebasestorage.app",
  messagingSenderId: "113079125585",
  appId: "1:113079125585:web:d09108936cf4b3e47a5a70"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
