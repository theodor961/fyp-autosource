import React, { useContext, useEffect }  from 'react'
import d6 from './AccountInfo.module.css'
import { auth, db } from '../firebase-config';
import {UserContext} from '../store/UserContext';
import { async } from '@firebase/util';
import { doc, getDoc } from 'firebase/firestore';

export default function AccountInfo(props) {
  //const userData = useContext(UserContext);

  // useEffect(async() => {
  //     const data = await getDoc(doc(db,'users',auth.currentUser?.uid));
  //     const result = data.docs.map(doc => ({ ...doc.data(), id: doc.id }));
  //     console.log("data: ", result.firstName);
  // })

  return (
    <div className={d6.InfoContainer}>
      <div className={d6.data}>
        <p>{auth.currentUser?.email}</p>
      </div>
    </div>
  )
}