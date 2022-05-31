import React from "react";
import { useNavigate } from "react-router-dom";

export default function ButtonLogin(props) {
    const navigate = useNavigate();
    return (
        <p onClick={()=>{navigate('/Login', {state:{pathAfterLogin:props.pathAfterLogin}})}}>
            {props.children}
        </p> 
    )
}