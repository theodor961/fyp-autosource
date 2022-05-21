import React from "react";

export default function Button(props) {
    return (
        <button
            onClick={props.onClick}
            type={props.type}
            onChange={props.onChange}
            style={{
                borderRadius: 10,
                borderWidth: 1,
                padding: 10,
                margin: 7,
                textAlign: 'center'
            }}
        >
            {props.children}
        </button>
    )
}