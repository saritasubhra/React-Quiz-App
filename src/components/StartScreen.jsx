import React from 'react'

function StartScreen({dispatch}) {
  return (
    <div className="start">
      <h2>Welcome to The React Quiz!</h2>
      <h3>x questions to test your React mastery</h3>
      <button className="btn btn-ui" onClick={()=>dispatch({type: "showQuestion"})}>
        Let's start
      </button>
    </div>
  )
}

export default StartScreen