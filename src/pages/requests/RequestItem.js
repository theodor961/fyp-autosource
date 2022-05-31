import React from 'react';
import Card from "../../components/Card";

export default function RequestItem(props) {
  return (
    
      <Card>
        <div onClick={props.onClick}>
            <p>{props.requestData.part_info.category} for {props.requestData.part_info.brand} {props.requestData.part_info.model}</p>
            <p>{props.requestData.description}</p>
        </div>
    </Card>
    
  )
}