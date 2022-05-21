import React from "react";

export default function Input(props) {
    return (
        <input
            required={props.required}
            type={props.type}
            placeholder={props.placeholder}
            style={{
                width: 200,
                padding: 10,
                margin: 7,
            }}
        />
    )
}