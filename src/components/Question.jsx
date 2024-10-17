import React from 'react'

function Question({ question, dispatch, choosenOption, numQuestions, index }) {

    const isAnswered = choosenOption !== null;
    return (
        <div>
            <h4>{question.question}</h4>
            <div className='options'>
                {question.options.map((option, i) => {
                    return <button
                        className={`btn btn-option ${i === choosenOption ? "answer" : ""} ${isAnswered ? i === question.correctOption ? "correct" : "wrong" : ""}`}
                        key={option}
                        disabled={isAnswered}
                        onClick={() => dispatch({ type: "checkAnswer", payload: { index: i, score: i === question.correctOption ? question.points : 0 } })}>
                        {option}
                    </button>
                })}
            </div>
            {index < numQuestions - 1 ?
                <button className='btn btn-ui' onClick={() => dispatch({ type: "nextQuestion" })}>Next</button>
                : <button className='btn btn-ui' onClick={() => dispatch({ type: "finish" })}>Finish</button>
            }
        </div>
    )
}

export default Question