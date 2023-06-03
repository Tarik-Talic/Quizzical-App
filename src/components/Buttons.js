import "../styles/Buttons.css";
const he = require("he");
export default function Buttons(props) {
  const styles = {
    backgroundColor: props.item.isHeld ? "#4D5B9E" : "white",
    color: props.item.isHeld ? "#ffffff" : "black",
  };

  return (
    <button
      className="answers"
      style={styles}
      id={props.answerId}
      isHeld={props.answers.isHeld}
      onClick={(e) => props.holdingAnswers(props.item.id, props.questionId)}
    >
      {he.decode(props.value)}
    </button>
  );
}
