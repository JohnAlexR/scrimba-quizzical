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
            // You should have a little brainstorming session
            // what would be the model for your data to be stored in
            // Tips:
            // 1. You need a list of randomized answers
            // 2. You need some unique Identifier for each answers
            // 3. You need a way to indicate which answer is selected
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

  // This is indeed working, but isCorrect is not really the
  // way to represent if something is selected, you should
  // use a better name for it like isSelected as the user can
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
