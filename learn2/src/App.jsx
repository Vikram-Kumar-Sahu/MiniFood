import React,{ useState } from 'react'
import { useFirebase } from "./context/Firebase";

function App() {
    const firebase =useFirebase();
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

    console.log("Firebase",firebase);

  return (
    <div>
      <h1>Vikram</h1>
      <input 
      onChange={(e)=> setEmail(e.target.value) }
      value={email}
      placeholder='Enter email'
      type="email" />
      <input 
      onChange={(e)=> setEmail(e.target.value) }
      value={password}
      placeholder='Enter password'
      type="password" />
      <button onClick={() => firebase.signupUserEmailAndPassword(email,password)}>Signup</button>
    </div>
  )
}

export default App
