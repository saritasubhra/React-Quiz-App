import React, { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import StartScreen from "./StartScreen";
import Question from "./Question";
import Progress from "./Progress";
import FinishScreen from "./FinishScreen";

const initialState = {
  questions: [],
  status: "loading",
  index: 0,
  choosenOption: null,
  score: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case "fetchData":
      return { ...state, questions: action.payload, status: "ready" };
    case "showQuestion":
      return { ...state, status: "active" };
    case "nextQuestion":
      return { ...state, index: state.index + 1, choosenOption: null };
    case "checkAnswer":
      return {
        ...state,
        choosenOption: action.payload.index,
        score: state.score + action.payload.score,
      };
    case "finish":
      return { ...state, status: "finished" };
    case "restart":
      return {
        ...state,
        status: "active",
        index: 0,
        choosenOption: null,
        score: 0,
      };

    default:
      throw new Error("Action unkonwn");
  }
}

function App() {
  const [{ questions, status, index, choosenOption, score }, dispatch] =
    useReducer(reducer, initialState);

  const numQuestions = questions.length;
  const maxPossiblePoints = questions.reduce((pre, cur) => pre + cur.points, 0);

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "fetchData", payload: data }))
      .catch((err) => console.log(err.message));
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "ready" && <StartScreen dispatch={dispatch} />}
        {status === "active" && (
          <>
            <Progress
              numQuestions={numQuestions}
              index={index}
              score={score}
              maxPossiblePoints={maxPossiblePoints}
            />
            <Question
              question={questions[index]}
              dispatch={dispatch}
              choosenOption={choosenOption}
              numQuestions={numQuestions}
              index={index}
            />
          </>
        )}
        {status === "finished" && (
          <FinishScreen
            dispatch={dispatch}
            score={score}
            maxPossiblePoints={maxPossiblePoints}
          />
        )}
      </Main>
    </div>
  );
}

export default App;
