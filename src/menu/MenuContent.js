import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import ButtonLogin from '../components/ButtonLogin';
import Login from '../pages/Login';
import d8 from './MenuContent.module.css'

export default function MenuContent(props) {
    const navigate = useNavigate();

    return (
        <div className={d8.container}>
            <ul >
                <li onClick={props.onClick}><Link to='/'>Home</Link></li>
                {/* <li onClick={props.onClick} ><p onClick={()=>{navigate('/Login', {state:{pathAfterLogin: '/'}})}}>Login</p></li> */}
                {/* <li onClick={props.onClick}><ButtonLogin pathAfterLogin="/">Login</ButtonLogin></li> */}
                <li onClick={props.onClick}><Link to='/login'>Login</Link></li>
                <li onClick={props.onClick}><Link to='/requestAutopartForm'>Request AutoPart</Link></li>
                <li onClick={props.onClick}><Link to='/myRequests'>My Requests</Link></li>
            </ul>

            
        </div>
    )
}
