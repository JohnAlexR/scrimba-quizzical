import React from "react";

export default function Answer({answer, select, isCorrect}) {


    const styles = {
        backgroundColor: isCorrect ? "green" : "white"
    }

    return (
        <div className="answer" onClick={select} style={{styles}}>
            <p>{answer}</p>
        </div>
    )
}