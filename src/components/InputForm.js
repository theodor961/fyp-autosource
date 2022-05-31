import React, { forwardRef } from "react";

const Input = forwardRef((props,ref) => {
    return (
        <input
            ref={ref}
            required={props.required}
            type={props.type}
            placeholder={props.placeholder}
            style={{
                width: 200,
                padding: 8,
                margin: 10,
                borderRadius: 10,
                borderWidth: 1,
            }}
        />
    )
})

export default Input;