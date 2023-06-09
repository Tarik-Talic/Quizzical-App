import FrontPage from "./components/FrontPage";
import Quiz from "./components/Quiz";
import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import "./App.css";
import ClipLoader from "react-spinners/RingLoader";
import background from "./assets/IconGrid2.png";

function App() {
  const [start, setStart] = useState(false);
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState([]);
  const [checkedAnswers, setCheckedAnswers] = useState(false);
  const [score, setScore] = useState(0);

  const url = "https://opentdb.com/api.php?amount=5&category=9&difficulty=medium";

  //!Geting the data

  useEffect(() => {
    setLoading(true);
    fetch(url)
      .then((res) => res.json())
      .then((data) => setData(formatQuizData(data.results)));
    setTimeout(() => {
      setLoading(false);
    }, 2000);
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
  //!Starting the Quiz

  function startQuiz() {
    setStart((prevState) => !prevState);
  }
  function resetQuiz() {
    setStart((prevState) => !prevState);
    setCheckedAnswers((prevState) => !prevState);
    setScore(0);
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

  // switch block
  function checkingCorrectAnswers() {
    setData((prevState) =>
      prevState.map((item) => {
        let markedAnswers = item.answers.map((answer) => {
          if (answer.isHeld && item.correctAnswer === answer.value) {
            setScore((prevState) => prevState + 1);
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
              IsFaded: true,
            };
          }
        });
        return {
          ...item,
          answers: markedAnswers,
        };
      })
    );
    setCheckedAnswers(true);
  }

  return (
    <div
      className="App"
      style={{
        backgroundImage: `url(${background})`,
      }}
    >
      {loading ? (
        <ClipLoader
          color={"white"}
          loading={loading}
          size={100}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      ) : (
        <>
          {!start && <FrontPage onClick={startQuiz} />}

          {start && (
            <Quiz
              key="1"
              id={nanoid()}
              quizData={data}
              holdingAnswers={holdingAnswers}
              checkingCorrectAnswers={checkingCorrectAnswers}
              checkedAnswers={checkedAnswers}
              score={score}
              playAgain={resetQuiz}
            />
          )}
        </>
      )}
    </div>
  );
}

export default App;
