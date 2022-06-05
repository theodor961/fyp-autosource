import React from 'react';
import Card from "../../components/Card";

import styles from './RequestItem.module.css';

export default function RequestItem(props) {
  return (
    <Card>
      <div onClick={props.onClick}>
        <img src={props.requestData.image} alt="no-image" className={styles.image} />
        <p>{props.requestData.part_info.category} for {props.requestData.part_info.brand} {props.requestData.part_info.model}</p>
        <p>{props.requestData.description}</p>
      </div>
    </Card>

  )
}