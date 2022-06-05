import React from 'react';
import d14 from './Card.module.css';

function Card(props){
    return (
        <div className={d14.card}>{props.children}</div>
    );
}

export default Card;