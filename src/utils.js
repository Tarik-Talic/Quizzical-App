import { nanoid } from "nanoid";

function shuffleAnswers(possibleAnswers) {
  let randomArr = [...possibleAnswers].sort(() => Math.random() - 0.5);
  return randomArr;
}

export default shuffleAnswers;
