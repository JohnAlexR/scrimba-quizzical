import React from "react";
import Question from "./Question";

export default function Quiz(props) {
  const [quizArray, setQuizArray] = React.useState(() => {
    console.log("state-set");
    return [];
  });
  const [roundNumber, setRoundNumber] = React.useState(() => {
    console.log("state-ran-round-number");
    return 1;
  });

  React.useEffect(() => {
    console.log("use effect ran");
    fetch("https://opentdb.com/api.php?amount=5&type=multiple")
      .then((res) => res.json())
      .then((data) => {
        // At this stage you don't need the callback to set the state:
        // const quizArray = data.results.map(...)
        // setQuizArray(quizArray)
        setQuizArray(() =>
          data.results.map((question) => {
            return {
              question: question.question,
              correct_answer: question.correct_answer,
              incorrect_answers: question.incorrect_answers,
              isSelected: false,
              isCorrect: false,
            };
          })
        );
      });
    console.log("api - in quiz- use effect ran");
  }, [roundNumber]);

  function nextRound() {
    setRoundNumber((prevRound) => prevRound + 1);
  }

  function selectAnswer(answer) {
    const newArray = [];

    quizArray.forEach((question) => {
      if (answer === question.correct_answer) {
        newArray.push({ ...question, isCorrect: true });
      } else {
        newArray.push({ ...question });
      }
    });

    setQuizArray(newArray);
  }

  const questionsEl = quizArray.map((question) => (
    <Question
      key={question.question}
      question={question.question}
      correct={question.correct_answer}
      incorrect={question.incorrect_answers}
      roundNumber={roundNumber}
      isSelected={question.isSelected}
      isCorrect={question.isCorrect}
      selectAnswer={selectAnswer}
    />
  ));

  return (
    <div className="questions-container">
      {questionsEl}
      <button className="button" onClick={nextRound}>
        Check Answers
      </button>
    </div>
  );
}
