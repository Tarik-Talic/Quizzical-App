import "../styles/Quiz.css";
import Questions from "../components/Questions";
import { nanoid } from "nanoid";

export default function Quiz(props) {
  const displayQuestions = props.quizData.map((item) => (
    <div className="quiz__questions" key={nanoid()}>
      <Questions
        key={item.id}
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
      <h1>QUIZZICAL</h1>
      {displayQuestions}
      {props.checkedAnswers ? (
        <>
          <p className="scoreDisplay">You scored {props.score}/5 correct answers.</p>
          <button className="checkAnswer btn" onClick={props.playAgain}>
            Play Again
          </button>
        </>
      ) : (
        <button className="resetQuiz btn" onClick={props.checkingCorrectAnswers}>
          Check answers
        </button>
      )}
    </div>
  );
}
