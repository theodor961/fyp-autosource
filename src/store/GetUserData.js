import { collection, doc, onSnapshot, getDoc } from 'firebase/firestore';
import { db, auth } from '../firebase-config';
import React, { useEffect, useState } from 'react';


export default function GetUserData(props) {
    const [docData, setDocData] = useState([]);

    const read = async () => {
        if (auth.currentUser != null) {
            const uid = auth.currentUser.uid;
            const docRef = doc(db, "users", uid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setDocData(docSnap.data());
                props.setUserData(docSnap.data());
            } else {
                console.log("no such document");
            }
        }
    }

    useEffect(() => {
        read();
    }, [auth.currentUser])

    return (
        <div></div>
    )
}
