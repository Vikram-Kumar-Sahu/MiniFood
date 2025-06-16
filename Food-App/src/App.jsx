import React from 'react'

import { app } from "./firebase";
import { getAuth,createUserWithEmailAndPassword } from "firebase/auth";
import SignupPage from './pages/Signup';
import SigninPage from './pages/Signin';

const auth = getAuth(app);

function App() {
  const signupUser = () => {
    createUserWithEmailAndPassword(auth,"vikramkumarsahu989@gmail.com","Vikram@123").then((value) => console.log(value));
  };
 

  return (
    <div>
      <SignupPage/>
      <SigninPage/>
    </div>
  )
}

export default App
