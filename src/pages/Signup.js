import React, { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebase-config';
import { doc, setDoc } from 'firebase/firestore';


export default function Signup() {

    const signupEmail = useRef();
    const signupPassword = useRef();
    const firstName = useRef();
    const lastName = useRef();

    const navigate = useNavigate();

    useEffect(() => {
        console.log("user: ", auth.currentUser?.email)
    })

    const createUser = async () => {
        try {
            const res = await createUserWithEmailAndPassword(
                auth,
                signupEmail.current.value,
                signupPassword.current.value
            );
            const uid = res.user.uid;
            const user = await setDoc(doc(db, 'users', uid), {
                email: signupEmail.current.value,
                password: signupPassword.current.value,
                firstName: firstName.current.value,
                lastName: lastName.current.value,
            }).then(
               navigate("/requestAutopartForm")
            )
        } catch (error) {
            alert(error.message);
        }
    }

    return (
        <div style={{ textAlign: 'center' }}>
            <h1>Register User</h1>
            <input
                required={true}
                ref={firstName}
                type='text'
                placeholder='First Name...'
            /> <br />
            <input
                required={true}
                ref={lastName}
                type='text'
                placeholder='Last Name...'
            /> <br />
            <input
                required={true}
                ref={signupEmail}
                type='email'
                placeholder='Email...'
            /> <br />
            <input
                required={true}
                ref={signupPassword}
                type='password'
                placeholder='Password...'
            /> <br />
            <button onClick={createUser}>SignUp</button>
            <p>Already have an account? <Link to="/login">Login</Link></p>
        </div>
    )
}