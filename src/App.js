import FrontPage from "./components/FrontPage";
import Quiz from "./components/Quiz";
import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import "./App.css";
import shuffleAnswers from "./utils";
import background from "./assets/cool-background.png";

function App() {
  const [start, setStart] = useState(false);
  const [data, setData] = useState([]);
  const url = "https://opentdb.com/api.php?amount=5&category=9&difficulty=medium";

  //!Geting the data

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setData(formatQuizData(data.results)));
    console.log("i fired once");
  }, []);

  //!Formating the Data

  function formatQuizData(questionsArray) {
    let formattedData = questionsArray.map((item) => {
      return {
        id: nanoid(),
        question: item.question,
        correctAnswer: item.correct_answer,
        answers: shuffleAnswers([...item.incorrect_answers, item.correct_answer]),
      };
    });
    return formattedData;
  }

  //!Starting the Quiz

  function startQuiz() {
    setStart(true);
  }

  return (
    <div className="App" style={{ backgroundImage: `url(${background})` }}>
      {!start && <FrontPage onClick={startQuiz} />}

      {start && <Quiz key={nanoid()} quizData={data} />}
    </div>
  );
}

export default App;
