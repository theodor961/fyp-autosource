import React from 'react';
import Card from "../../components/Card";

import styles from '../requests/RequestItem.module.css';
import imgAlt from '../../assets/imgAlt.png';

export default function OrderItem(props) {
  return (
    <Card>
      <div onClick={props.onClick} className={styles.container}>
        <img src={props.orderData.auto_part.image || imgAlt} alt="no-image" className={styles.image} />
        <p className={styles.data}>{props.orderData.auto_part.description}</p>
        <div className={styles.child1}>
          <div className={styles.miniChild}>
            <p className={styles.price}>{props.orderData.amount}</p>
            {props.orderData.auto_part.refundable == true && (
              <div className={styles.refundableContainer}>
                <p className={styles.refundable}>refundable</p>
              </div>
            )}
          </div>
        </div>
        <div className={styles.child2}>
          <div className={styles.miniChild}>
            <p className={styles.date}>{props.orderData.created_at.toDate().toString().substring(0, 21)}</p>
            <div className={props.orderData.status == 'Pending'? styles.pendingContainer : props.orderData.status == 'Picked up' ? styles.pickedupContainer : styles.deliveredContainer}>
              <p className={props.orderData.status == 'Pending'? styles.pending : props.orderData.status == 'Picked up' ? styles.pickedup : styles.delivered}>{props.orderData.status}</p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}