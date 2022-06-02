import React, {useState} from 'react';

import styles from '../requests/RequestFullView.module.css';
import { IoArrowBack } from 'react-icons/io5';
import OrderFillInfos from '../orders/OrderFillInfos';


export default function OrderFullView(props) {
  const [overlay,setOverlay] = useState(false);
   
  return (
    <div className={styles.modalBackground}>
      <div className={styles.modal}>
      {console.log('orderData: ', props.orderData)} 
        <div>
          <button className={styles.button} onClick={props.onClose}><IoArrowBack size='30' /></button>
        </div>
        <h2>Order full view</h2>
        <p>{props.orderData.auto_part.title}</p>
      </div>
    </div>
  )
}
