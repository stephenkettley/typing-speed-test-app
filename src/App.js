import React, { useRef, useState } from "react";
import "./App.css";
import Timer from "./components/Timer";
import Word from "./components/Word";

const getCloud = () =>
  `The quick brown fox jumps over the lazy dog`
    .split(" ")
    .sort(() => (Math.random() > 0.5 ? 1 : -1));

function App() {
  const [userInput, setUserInput] = useState("");

  const cloud = useRef(getCloud());

  const [activeWordIndex, setActiveWordIndex] = useState(0);

  const [correctWordArray, setCorrectWordArray] = useState([]);

  const [startCounting, setStartCounting] = useState(false);

  function processInput(value) {
    setStartCounting(true);

    if (activeWordIndex === cloud.current.length) {
      return;
    }
    if (value.endsWith(" ")) {
      if (activeWordIndex === cloud.current.length - 1) {
        setUserInput("Completed!");
        setStartCounting(false);
        return;
      }
      setActiveWordIndex((index) => index + 1);
      setUserInput("");

      setCorrectWordArray((prevState) => {
        const word = value.trim();
        const newResult = [...prevState];
        newResult[activeWordIndex] = word === cloud.current[activeWordIndex];
        return newResult;
      });
    } else {
      setUserInput(value);
    }
  }

  return (
    <div id="main-container">
      <h1>topTypist [v1]</h1>
      <p>
        {cloud.current.map((word, index) => {
          return (
            <Word
              text={word}
              active={index === activeWordIndex}
              correct={correctWordArray[index]}
            ></Word>
          );
        })}
      </p>
      <input
        placeholder="Start typing..."
        type="text"
        value={userInput}
        onChange={(e) => processInput(e.target.value)}
      />
      <Timer
        startCounting={startCounting}
        correctWords={correctWordArray.filter(Boolean).length}
      />
    </div>
  );
}

export default App;
