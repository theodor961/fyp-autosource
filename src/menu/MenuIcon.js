import React from 'react'
import d9 from './MenuIcon.module.css'

export default function MenuIcon(props) {
    return (
        <div className={props.state ? d9.opened : d9.closed} onClick={props.onClick}>
            <label>
                <span />
                <span />
                <span />
            </label>
        </div>
    )
}