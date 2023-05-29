import Buttons from "../components/Buttons";
import { nanoid } from "nanoid";
import "../styles/Questions.css";
export default function Questions(props) {
  let listOfAnswers = props.answers.map((item) => (
    <Buttons key={nanoid()} quizData={props.quizData} item={item} value={item.value} />
  ));
  return (
    <div>
      <h2 className="questionsContainer__questions">{props.question}</h2>
      {listOfAnswers}
    </div>
  );
}
