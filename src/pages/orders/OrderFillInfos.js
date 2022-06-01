import React, { useRef } from 'react';

import styles from '../requests/RequestFullView.module.css';
import { IoArrowBack } from 'react-icons/io5';
import { addDoc, collection } from 'firebase/firestore';
import { auth, db } from '../../firebase-config';

export default function OrderFillInformations(props) {
  const address = useRef('');

  const ordersCollRef = collection(db,'orders');
  const cityCollRef = collection(db,'');

  const createOrder = async() => {
    try {
      const order = await addDoc(ordersCollRef, {
        user_id: auth.currentUser.uid,
        destination: address.current.value,
        created_at: new Date(),
        reply_id: props.reply_id,
      });
    } catch(error) {
      console.log(error);
    }
  }

  return (
    <div className={styles.modalBackground}>
      <div className={styles.modal}>
        <div>
          <button className={styles.button} onClick={props.onClose}><IoArrowBack size='30' /></button>
        </div>
        <h3>Fill you informations</h3>
        <input 
          required 
          ref={address}
          type='text'
          placeholder='Detailed address'
        />
        <br/><br/>
        <button onClick={createOrder}>Done</button>
      </div>
    </div>
  )
}
