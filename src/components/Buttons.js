import "../styles/Buttons.css";
const he = require("he");
export default function Buttons(props) {
  function displayAnswers(item) {
    let styles = {};
    if (item.isCorrect) {
      styles = {
        backgroundColor: "green",
      };
      return styles;
    } else if (item.isWrong) {
      styles = {
        backgroundColor: "#dc442e",
        opacity: "0.5",
      };
      return styles;
    } else if (item.IsFaded) {
      styles = {
        opacity: "0.5",
      };
      return styles;
    } else {
      styles = {
        backgroundColor: item.isHeld ? "#69b4ff" : "#9e9e9e",
      };
      return styles;
    }
  }

  return (
    <button
      className="answers"
      style={displayAnswers(props.item)}
      id={props.answerId}
      isHeld={props.answers.isHeld}
      onClick={(e) => props.holdingAnswers(props.item.id, props.questionId)}
    >
      {he.decode(props.value)}
    </button>
  );
}
