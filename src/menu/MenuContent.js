import React from 'react'
import { Link } from 'react-router-dom';
import d8 from './MenuContent.module.css'

export default function MenuContent(props) {
    return (
        <div className={d8.container}>
            <ul >
                <li onClick={props.onClick}><Link to='/'>Home</Link></li>
                <li onClick={props.onClick}><Link to='/login'>Login</Link></li>
                <li onClick={props.onClick}><Link to='/requestAutopartForm'>Request AutoPart</Link></li>
            </ul>
        </div>
    )
}