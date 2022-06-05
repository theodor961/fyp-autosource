import React from 'react';
import Card from "../../components/Card";
import ReplyFullView from '../replies/ReplyFullView';

export default function OrderItem(props) {
  return (
    <Card>
        {console.log('props: ', props.orderData)}
        <div onClick={props.onClick}>
            <p>{props.orderData.auto_part.title}</p>
            <p>{props.orderData.auto_part.category} for {props.orderData.auto_part.brand} {props.orderData.auto_part.model} {props.orderData.auto_part.year}</p>
        </div>
    </Card>
  )
}