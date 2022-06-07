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

    const [error,setError] = useState(false);

    const navigate = useNavigate();
    
    const location = useLocation();

    useEffect(() => {
        console.log("path: ", location.state)
    }, [])

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
        } catch(error) {
          console.log(error.message);
          setError(true);
        }
        if (error != true) {
            loginEmail.current.value = "";
            loginPassword.current.value = "";
        }
    }

    return (
        <div style={{ textAlign: 'center' }}>
            <h1>Login</h1>
            <input
                ref={loginEmail}
                type='email'
                placeholder='Email...'
                required={true}
            /> 
            <br/>
            <input
                ref={loginPassword}
                type='password'
                placeholder='Password...'
                required={true}
            /> <br/>
            {error == true && (<p>Incorrect username or password</p>)}
            <button onClick={login}>Login</button>
            <p>Don't have an account? <Link to="/signup">SignUp</Link></p>
            {auth.currentUser != null && (<p>You are already logged in. Login from another account</p>)}
        </div>
    )
}