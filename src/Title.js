import React from "react";

export default function Title(props) {
    return (
        <div className="title-container">
            <h1 className="title">Quizzical</h1>
            <p>Can you pass?</p>
            <button className="button" onClick={props.navigate}>Start Quiz</button>
        </div>
    )
}