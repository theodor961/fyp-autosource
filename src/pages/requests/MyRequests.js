import React, {useEffect, useState} from 'react';
import { collection, doc, onSnapshot, query, where } from 'firebase/firestore';

import { db, auth } from '../../firebase-config';
import RequestItem from './RequestItem';
import RequestFullView from './RequestFullView';


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
      console.log(requests);
    } catch(error) {
      console.log(error);
    }
  }, [])

  return (
    <div style={{textAlign: 'center'}}>
        <h1>My Requests</h1>

        {requests.map((request) => {
          return (
            <RequestItem 
              requestData={request}
              key={request.id} 
              onClick={() => {
                // openOverlay();
                // setTheRequest(request);
                setOverlay({status: true, data: request});
                console.log("i clicked", overlay.status);
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
