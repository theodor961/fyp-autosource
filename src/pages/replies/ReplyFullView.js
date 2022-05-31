import React, { useState } from 'react';

import styles from '../requests/RequestFullView.module.css';
import { IoArrowBack } from 'react-icons/io5';
import OrderFillInfos from '../orders/OrderFillInfos';

export default function ReplyFullView(props) {
  const [overlay,setOverlay] = useState(false);
  
  return (
    <div className={styles.modalBackground}>
      <div className={styles.modal}>
        <div>
          <button className={styles.button} onClick={props.onClose}><IoArrowBack size='30' /></button>
        </div>
        <p>Description: {props.replyData.description}</p>
        <p>Condition: {props.replyData.condition}</p>
        <p>Refundble: {props.replyData.refundable}</p>
        <p>Price: {props.replyData.price}</p>
        <p>Created at: {props.replyData.created_at.toDate().toString().substring(0,15)}</p>
        <br/>
        <br/>
        <button onClick={() => {setOverlay(true)}}>Order</button>
        {overlay == true && <OrderFillInfos reply_id={props.replyData.id} onClose={() => {setOverlay(false)}}/>}
      </div>
    </div>
  )
}
