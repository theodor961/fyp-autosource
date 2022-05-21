import React from 'react'
import {Link} from 'react-router-dom';
import Logout from '../components/Logout';
import d7 from './FooterMenuContent.module.css';

export default function FooterMenuContent() {
    return (
        <div className={d7.container}>
        <ul >
         <li ><Link to=''><Logout>Log out</Logout></Link></li>
        </ul>    
        </div>
    )
}
