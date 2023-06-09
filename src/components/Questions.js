import Buttons from "../components/Buttons";
import "../styles/Questions.css";
const he = require("he");
export default function Questions(props) {
  let listOfAnswers = props.answers.map((item) => (
    <Buttons
      key={item.id}
      isHeld={item.isHeld}
      quizData={props.quizData}
      answers={props.answers}
      value={item.value}
      item={item}
      questionId={props.questionId}
      holdingAnswers={props.holdingAnswers}
    />
  ));
  return (
    <>
      <h2 className="questionsContainer__questions">{he.decode(props.question)}</h2>
      {listOfAnswers}
    </>
  );
}
