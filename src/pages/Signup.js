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
    const phone = useRef();

    const navigate = useNavigate();


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
                first_name: firstName.current.value,
                last_name: lastName.current.value,
                phone: phone.current.value,
                created_at: new Date(),
            }).then(
               navigate(-1)
            );
            signupEmail.current.value = '';
            signupPassword.current.value = '';
            firstName.current.value = '';
            lastName.current.value = '';
            phone.current.value = '';
        } catch (error) {
            alert(error.message);
            console.log(error);
        }
    }

    return (
        <div style={{ textAlign: 'center' }}>
            <h1>Register User</h1>
            <form onSubmit={createUser} action="#">
            <input
                required
                ref={firstName}
                type='text'
                placeholder='First Name...'
            /> <br />
            
            <input
                required
                ref={lastName}
                type='text'
                placeholder='Last Name...'
            /> <br />
            <input
                required
                ref={signupEmail}
                type='email'
                placeholder='Email...'
            /> <br />
            <input
                required
                ref={signupPassword}
                type='password'
                placeholder='Password...'
            /> <br />
            <input
                required
                ref={phone}
                type='number'
                placeholder='Phone...'
            /> <br />
            <button type="submit">Signup</button>
            </form>
            <p>Already have an account? <Link to="/login">Login</Link></p>
        </div>
    )
}