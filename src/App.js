import { useState } from "react";
import "./App.css";
import FrontPage from "./components/FrontPage";
import Questions from "./components/Questions";
import background from "./assets/cool-background.png";

function App() {
  const [start, setStart] = useState(false);
  console.log(start);
  function startQuiz() {
    setStart(true);
  }
  return (
    <div className="App" style={{ backgroundImage: `url(${background})` }}>
      {start === false && <FrontPage onClick={startQuiz} />}

      {start && <Questions />}
    </div>
  );
}

export default App;
