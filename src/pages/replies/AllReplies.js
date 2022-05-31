import React, { useEffect, useState } from 'react';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../../firebase-config';

import ReplyItem from './ReplyItem';
import ReplyFullView from './ReplyFullView';


export default function AllReplies(props) {
  const repliesCollRef = collection(db,'replies');
  const [replies,setReplies] = useState([]);
  const [overlay,setOverlay] = useState({status: false, data: []});

  useEffect(() => {
    try {
        const q = query(repliesCollRef, where("request_id","==",props.request_id));
        onSnapshot(q, (snapshot) => {
          setReplies(snapshot.docs.map((doc) => ({...doc.data(), id: doc.id})));
        });
        console.log(replies);
        console.log(props.request_id);
      } catch(error) {
        console.log(error);
      }
  }, [])

  return (
    <div>
        <h1>Replies</h1>

        {replies.map((reply) => {
            return (
                <ReplyItem
                    replyData={reply}
                    key={reply.id}
                    onClick={() => {
                        setOverlay({status: true, data: reply});
                        console.log("i clicked", overlay.status);
                    }}
                />
            )
        })}

        {overlay.status == true && 
          <ReplyFullView  
            replyData={overlay.data}
            onClose={() => {setOverlay({status: false, data: []})}}
          />
        }
    </div>
  )
}