import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation, useParams } from 'react-router-dom';

import {
    onAuthStateChanged,
    signOut,
    signInWithEmailAndPassword
} from 'firebase/auth';
import {auth} from '../firebase-config';

export default function Login(props) {
    const loginEmail = useRef();
    const loginPassword = useRef();
    const [user,setUser] = useState({});

    const navigate = useNavigate();
    const {dest} = useParams();

    onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
    })

    const login = async () => {
        try {
          const user = await signInWithEmailAndPassword(
            auth,
            loginEmail.current.value,
            loginPassword.current.value
          );
          console.log(user);
          if (user) {
            navigate("/requestAutopartForm")
        }
        } catch(error) {
          alert(error.message);
        }
    }

    const signout = async () => {
        await signOut(auth);
    }

    return (
        <div style={{ textAlign: 'center' }}>
            <h1>Login</h1>
           
            <input
                ref={loginEmail}
                type='email'
                placeholder='Email...'
            /> 
            
            <br/>
            <input
                ref={loginPassword}
                type='password'
                placeholder='Password...'
            /> <br/>

            <button onClick={login}>Login</button>
            <p>Don't have an account? <Link to="/signup">SignUp</Link></p>
        </div>
    )
}