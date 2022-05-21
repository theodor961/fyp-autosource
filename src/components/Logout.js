import React from "react";
import { auth } from "../firebase-config";

export default function Logout(props) {
    return (
        <div onClick={() => auth.signOut()}>{props.children}</div> 
    )
}