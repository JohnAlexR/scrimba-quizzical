import React from "react";
import Answer from "./Answer";

export default function Question({
  question,
  correct,
  incorrect,
  roundNumber,
  isSelected,
  isCorrect,
  selectAnswer,
}) {
  // These states are not needed, you should save
  // the answers list and shuffle them after you received the data from the api
  // I will mark each part which is not needed here.
  // This component should only be responsible to present the elements to the user

  // Not needed
  const answerArray = [correct, incorrect[0], incorrect[1], incorrect[2]];
  // Not needed
  const [answerEl, setAnswerEl] = React.useState(() => {
    console.log("answerEl state ran");
    return [];
  });

  // There is a shorter way of doing this by using array.sort() + Math.random()
  function shuffle(array) {
    let currentIndex = array.length;
    let randomIndex;

    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }
    return array;
  }

  // Not needed
  React.useEffect(() => {
    const shuffledArray = shuffle(answerArray);

    console.log("question use effect ran");

    setAnswerEl(() =>
      shuffledArray.map((answer) => (
        <Answer
          key={answer}
          answer={answer}
          correct={correct}
          select={() => selectAnswer(answer)}
          isCorrect={isCorrect}
        />
      ))
    );
  }, [roundNumber]);

  // Answers should be rendered in the return statement
  return (
    <div className="question-container">
      <h3>{question}</h3>
      <div className="answer-container">{answerEl}</div>
    </div>
  );
}
