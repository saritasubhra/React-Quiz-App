import React from 'react'

function FinishScreen({score, maxPossiblePoints, dispatch}) {
  return (
    <>
      <p className="result">
         You scored <strong>{score}</strong> out of{" "} {maxPossiblePoints}
      </p>
      {/* <p className="highscore">(Highscore: {highscore} points)</p> */}
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "restart" })}
      >
        Restart quiz
      </button>
    </>
  )
}

export default FinishScreen