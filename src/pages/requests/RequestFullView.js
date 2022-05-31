import React from 'react';

import { IoArrowBack } from 'react-icons/io5';
import styles from './RequestFullView.module.css';

import AllReplies from '../replies/AllReplies';

export default function RequestFullView(props) {
  return (
    <div className={styles.modalBackground}>
      <div className={styles.modal}>
        <div>
          <button className={styles.button} onClick={props.onClose}><IoArrowBack size='30' /></button>
        </div>
        
        <p>Category: {props.requestData.part_info.category}</p>
        <p>Car: {props.requestData.part_info.model} {props.requestData.part_info.brand} {props.requestData.part_info.year}</p>
        <p>Description: {props.requestData.description}</p>
        <p>Created at: {props.requestData.created_at.toDate().toString().substring(0,15)}</p>
        <AllReplies request_id={props.requestData.id}/>
      </div>
    </div>
  )
}
