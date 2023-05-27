import "../styles/Quiz.css";
import Questions from "../components/Questions";
import { nanoid } from "nanoid";

export default function Quiz(props) {
  const displayQuestions = props.quizData.map((item) => (
    <div className="quiz__questions">
      <Questions
        key={item.id}
        quizData={props.quizData}
        question={item.question}
        correct_answer={item.correctAnswer}
        answers={item.answers}
      />
    </div>
  ));

  return <div className="question">{displayQuestions}</div>;
}
