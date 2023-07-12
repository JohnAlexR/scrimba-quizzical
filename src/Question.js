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
  const answerArray = [correct, incorrect[0], incorrect[1], incorrect[2]];
  const [answerEl, setAnswerEl] = React.useState(() => {
    console.log("answerEl state ran");
    return [];
  });

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

  return (
    <div className="question-container">
      <h3>{question}</h3>
      <div className="answer-container">{answerEl}</div>
    </div>
  );
}
