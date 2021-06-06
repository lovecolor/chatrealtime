import React from 'react'
import "./style.scss"

export default function MessageItem(props) {
    const {isLeft,mess}=props
    return (
        <div className={isLeft?"mess-left":"mess-right"}>
            <div className="avt">{isLeft?"T":"F"}</div>
            <span className="text">{mess}</span>
        </div>
    )
}
