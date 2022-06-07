import React, {useEffect, useState} from 'react';
import { collection, doc, onSnapshot, query, where } from 'firebase/firestore';

import { db, auth } from '../firebase-config';
import RequestItem from './requests/RequestItem';
import RequestFullView from './requests/RequestFullView';

import styles from './MyRequests.module.css';

export default function MyRequests(props) {
  const requestsCollRef = collection(db,'requests');
  const [requests,setRequests] = useState([]);

  const [overlay, setOverlay] = useState({status: false, data: []});

  useEffect(() => {
    try {
      const q = query(requestsCollRef, where("user_id","==",auth.currentUser.uid));
      onSnapshot(q, (snapshot) => {
        setRequests(snapshot.docs.map((doc) => ({...doc.data(), id: doc.id})));
      });
    } catch(error) {
      console.log(error);
    }
  }, [])

  return (
    <div className={styles.container}>
      <p className={styles.title}>My Requests</p>
      

        {requests.map((request) => {
          return (
            <RequestItem 
              requestData={request}
              key={request.id} 
              onClick={() => {
                setOverlay({status: true, data: request});
              }}
            />
          )
          })
        }

        {overlay.status == true && 
          <RequestFullView  
            requestData={overlay.data}
            onClose={() => {setOverlay({status: false, data: []})}}
          />
        }

    </div>
  )
}
