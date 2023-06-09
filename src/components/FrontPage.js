import "../styles/FrontPage.css";
import Logo from "../assets/quizLogo.png";
export default function FrontPage(props) {
  return (
    <div className="front-page">
      <img className="mainLogo" src={Logo} />
      <h1 className="front-page__title">Quizzical</h1>
      <p className="front-page__description">Welcome to the quizz App</p>
      <button className="front-page__start-btn" onClick={props.onClick}>
        Start Quiz
      </button>
    </div>
  );
}
