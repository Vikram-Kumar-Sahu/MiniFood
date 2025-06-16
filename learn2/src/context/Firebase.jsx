import { createContext } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getDatabase, set, ref } from "firebase/database";
import { useContext } from 'react';

const firebaseConfig = {
  apiKey: "AIzaSyDNzewmAfv8wEoncAAaGgohG_2BoqFGegQ",
  authDomain: "app-d0512.firebaseapp.com",
  databaseURL: "https://app-d0512-default-rtdb.firebaseio.com",
  projectId: "app-d0512",
  storageBucket: "app-d0512.firebasestorage.app",
  messagingSenderId: "115670571429",
  appId: "1:115670571429:web:9aa9f14f7a8a5b4800f04c"
};

const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
const database = getDatabase(firebaseApp);

const FirebaseContext = createContext(null);
export const useFirebase = () => useContext(FirebaseContext);

export const FirebaseProvider = (props) => {

    const signupUserEmailAndPassword = (email, password) => {
        return createUserWithEmailAndPassword(firebaseAuth, email, password);
    };

    const putData = (key, data) => set(ref(database, key), data);

    return (
        <FirebaseContext.Provider value={{ signupUserEmailAndPassword, putData }}>
            {props.children}
        </FirebaseContext.Provider>
    );
};