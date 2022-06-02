import React, { useContext, useEffect, useRef, useState }  from 'react'
import d6 from './AccountInfo.module.css'
import { auth, db } from '../firebase-config';
import {UserContext} from '../store/UserContext';
import { async } from '@firebase/util';
import { doc, getDoc } from 'firebase/firestore';

export default function AccountInfo(props) {
  const userData = useContext(UserContext);
  // const [docData,setDocData] = useState([]);

  // const read = async() => {
  //   if (auth.currentUser != null) {
  //     const uid = auth.currentUser.uid;
  //     const docRef = doc(db,"users",uid);
  //     const docSnap = await getDoc(docRef);
  //     if (docSnap.exists()) {
  //       setDocData(docSnap.data());
  //     } else {
  //       console.log("no such document");
  //     }
  //   }
  // }

  // useEffect(() => {
  //   read();
  // }, [auth.currentUser])

  return (
    <div className={d6.InfoContainer}>
      <div className={d6.data}>
        {auth.currentUser != null && (<p>{userData?.first_name} {userData?.last_name}</p>)}
        <p>{auth.currentUser?.email}</p>
      </div>
    </div>
  )
}