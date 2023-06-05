import "../styles/Buttons.css";
const he = require("he");
export default function Buttons(props) {
  console.log(props);

  function displayAnswers(item) {
    let styles = {};
    if (item.isCorrect) {
      styles = {
        backgroundColor: "green",
      };
      return styles;
    } else if (item.isWrong) {
      styles = {
        backgroundColor: "red",
      };
      return styles;
    } else if (item.faded) {
      styles = {
        backgroundColor: "purple",
      };
      return styles;
    } else {
      styles = {
        backgroundColor: item.isHeld ? "blue" : "white",
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
