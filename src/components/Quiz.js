import "../styles/Quiz.css";
import Questions from "../components/Questions";
import { nanoid } from "nanoid";

export default function Quiz(props) {
  const displayQuestions = props.quizData.map((item) => (
    <div className="quiz__questions">
      <Questions
        key={nanoid()}
        quizData={props.quizData}
        question={item.question}
        questionId={item.id}
        correctAnswer={item.correctAnswer}
        answers={item.answers}
        holdingAnswers={props.holdingAnswers}
      />
    </div>
  ));
  return (
    <div className="questionsContainer">
      <h1>QUZZICAL</h1>
      {displayQuestions}
      <button className="checkAnswerBtn" onClick={props.checkingCorrectAnswers}>
        Check answers
      </button>
    </div>
  );
}
