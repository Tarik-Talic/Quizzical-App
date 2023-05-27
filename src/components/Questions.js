import Buttons from "../components/Buttons";
import { nanoid } from "nanoid";
export default function Questions(props) {
  let listOfAnswers = props.answers.map((item) => (
    <Buttons key={nanoid()} quizData={props.quizData} item={item} value={item.value} />
  ));
  return (
    <div>
      <h2>{props.question}</h2>
      {listOfAnswers}
    </div>
  );
}
