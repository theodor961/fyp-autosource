import React, { useEffect } from 'react';

import { IoArrowBack } from 'react-icons/io5';
import styles from './RequestFullView.module.css';

import AllReplies from '../replies/AllReplies';
import Image from '../../components/Image';

import d10 from '../../components/Image.module.css';

export default function RequestFullView(props) {
  useEffect(() => {
    console.log("image: ", props.requestData.image)
  })

  return (
    <div className={styles.modalBackground}>
      <div className={styles.modal}>
        <div>
          <button className={styles.button} onClick={props.onClose}><IoArrowBack size='30' /></button>
        </div>
        <h3>{props.requestData.title}</h3>
        <p>Category: {props.requestData.part_info.category}</p>
        <p>Car: {props.requestData.part_info.model} {props.requestData.part_info.brand} {props.requestData.part_info.year}</p>
        <p>Description: {props.requestData.description}</p>
        <p>Created at: {props.requestData.created_at.toDate().toString().substring(0,15)}</p>
        {props.requestData.image && <Image src={props.requestData.image} alt='no_img' className={d10.image} />}
        {props.requestData.audio && <audio controls controlsList="nodownload" src={props.requestData.audio} type='audio/*'> </audio>}
        <br/>
        <AllReplies request_id={props.requestData.id}/>
      </div>
    </div>
  )
}
