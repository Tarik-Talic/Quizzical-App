import FrontPage from "./components/FrontPage";
import Quiz from "./components/Quiz";
import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import "./App.css";
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
  }, [start]);

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
  function shuffleAnswers(possibleAnswers) {
    let randomArr = [...possibleAnswers].sort(() => Math.random() - 0.5);
    let arrayOfAnswers = randomArr.map((item) => {
      return {
        value: item,
        id: nanoid(5),
        isHeld: false,
      };
    });
    return arrayOfAnswers;
  }
  console.log(data);
  //!Starting the Quiz

  function startQuiz() {
    setStart((prevState) => !prevState);
  }

  //!Marking The Answers

  function holdingAnswers(answerId, questionId) {
    setData((prevQuestions) =>
      prevQuestions.map((item) => {
        if (item.id === questionId) {
          let newAnswersArr = item.answers.map((answer) => {
            if (answer.id === answerId) {
              return {
                ...answer,
                isHeld: true,
              };
            } else {
              return {
                ...answer,
                isHeld: false,
              };
            }
          });
          return {
            ...item,
            answers: newAnswersArr,
          };
        } else {
          return item;
        }
      })
    );
  }
  // !Checking the answers
  function checkingCorrectAnswers() {
    setData((prevState) =>
      prevState.map((item) => {
        let markedAnswers = item.answers.map((answer) => {
          if (answer.isHeld && item.correctAnswer === answer.value) {
            return {
              ...answer,
              isCorrect: true,
            };
          } else if (!answer.isHeld && item.correctAnswer === answer.value) {
            return {
              ...answer,
              isCorrect: true,
            };
          } else if (answer.isHeld && item.correctAnswer !== answer.value) {
            return {
              ...answer,
              isWrong: true,
            };
          } else {
            return {
              ...answer,
              faded: true,
            };
          }
        });
        return {
          ...item,
          answers: markedAnswers,
        };
      })
    );
  }

  return (
    <div
      className="App"
      style={{
        backgroundImage: `url(${background})`,
        backgroundRepeat: "repeat",
      }}
    >
      {!start && <FrontPage onClick={startQuiz} />}

      {start && (
        <Quiz
          key={nanoid()}
          id={nanoid()}
          quizData={data}
          holdingAnswers={holdingAnswers}
          checkingCorrectAnswers={checkingCorrectAnswers}
        />
      )}
    </div>
  );
}

export default App;
