import './App.css'
import SignUpForm from './SignUpForm'
import Authenticate from './Authenticate'
import { useState } from 'react';
    
  export default function App(){
    const [token, setToken] = useState(null);
   
    return (
      <>
      <Authenticate token={token} setToken={setToken}/>
      <SignUpForm token={token} setToken={setToken} />
      </>
    );
  }  


