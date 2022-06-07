import React from 'react';

import styles from '../requests/RequestFullView.module.css';
import { IoArrowBack } from 'react-icons/io5';


export default function OrderFullView(props) {

  return (
    <div className={styles.modalBackground}>
      <div className={styles.modal}>
        <div>
          <button className={styles.button} onClick={props.onClose}><IoArrowBack size='30' /></button>
        </div>
        <h2>Order full view</h2>
        <p>{props.orderData.auto_part.title}</p>
        <p>{props.orderData.auto_part.description}</p>
        <p>Category: {props.orderData.auto_part.category}</p>
        <p>Car: {props.orderData.auto_part.brand} {props.orderData.auto_part.model} {props.orderData.auto_part.year}</p>
        <p>Amount: {props.orderData.amount}</p>
        <p>Orderd at: {props.orderData.created_at.toDate().toString().substring(0, 15)}</p>
        <image source={props.orderData.auto_part.image} style={{width: 50, height: 50}}/>
      </div>
    </div>
  )
}
