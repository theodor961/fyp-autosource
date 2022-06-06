import React from 'react';
import Card from "../../components/Card";

import styles from './RequestItem.module.css';
import imgAlt from '../../assets/imgAlt.png';

export default function RequestItem(props) {
  return (
    <Card>
      <div onClick={props.onClick} className={styles.container}>
        <img src={props.requestData.image || imgAlt} alt="no-image" className={styles.image} />
        <p className={styles.label}>Part name:</p>
        <p className={styles.data}>{props.requestData.title}</p>
        <br/> <br/>
        <div className={styles.child1}>
          <div className={styles.miniChild}>
          <p className={styles.label}>Description:</p>
          <p className={styles.data}>{props.requestData.description.substring(0,190)}...</p>
          </div>
        </div>
        <div className={styles.child2}>
          <p className={styles.date}>{props.requestData.created_at.toDate().toString().substring(0,15)}</p>
        </div>
      </div>
    </Card>

  )
}