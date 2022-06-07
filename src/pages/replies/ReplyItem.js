import React from 'react';

import Card from '../../components/Card';

import styles from '../requests/RequestItem.module.css';
import imgAlt from '../../assets/imgAlt.png';

import {MdShoppingCart} from "react-icons/md";

export default function ReplyItem(props) {
    return (
        <Card>
            <div onClick={props.onClick} className={styles.container}>
                <img src={props.replyData.image || imgAlt} alt="no-image" className={styles.image} />
                <p className={styles.data}>{props.replyData.description}</p>
                <div className={styles.child1}>
                    <div className={styles.miniChild}>
                        <p className={styles.price}>{props.replyData.price}</p>
                        {props.replyData.refundable == true && (
                            <div className={styles.refundableContainer}>
                                <p className={styles.refundable}>refundable</p>
                            </div>
                        )}
                    </div>
                </div>
                <div className={styles.child2}>
                    <div className={styles.miniChild}>
                        <p className={styles.date}>{props.replyData.created_at.toDate().toString().substring(0, 21)}</p>
                        <div className={styles.orderContainer}>
                            <p className={styles.order}>Order</p>
                            <MdShoppingCart className={styles.icon}/>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    )
}
