import React, {useEffect, useState} from "react";
import { Link, useNavigate } from "react-router-dom";

import { auth } from "../firebase-config";

import Button from "../components/Button";

export default function HomePage() {
    return (
        <div style={{textAlign: 'center'}}>
            <h1>HomePage</h1>
        </div>
    )
}