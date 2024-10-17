import React from 'react'

function Progress({ numQuestions, index, score, maxPossiblePoints }) {
    return (
        <header className='progress'>
            <progress max={numQuestions} value={index + 1} />

            <p>
                Question <strong>{index + 1}</strong> / {numQuestions}
            </p>

            <p>
                <strong>{score}</strong> / {maxPossiblePoints}
            </p>
        </header>
    )
}

export default Progress