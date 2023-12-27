import React, { useEffect, useRef, useState } from "react";
import "./App.css";

const getCloud = () =>
  `The quick brown fox jumps over the lazy dog`
    .split(" ")
    .sort(() => (Math.random() > 0.5 ? 1 : -1));

function Word(props) {
  const { text, active, correct } = props;

  const rerender = useRef(0);

  useEffect(() => {
    rerender.current += 1;
  });

  if (correct === true) {
    return (
      <span className="correct">
        {text} ({rerender.current})
      </span>
    );
  }

  if (correct === false) {
    return (
      <span className="incorrect">
        {text} ({rerender.current})
      </span>
    );
  }

  if (active) {
    return (
      <span className="active">
        {text} ({rerender.current})
      </span>
    );
  }

  return (
    <span>
      {text} ({rerender.current})
    </span>
  );
}

Word = React.memo(Word);

function App() {
  const [userInput, setUserInput] = useState("");

  const cloud = useRef(getCloud());

  const [activeWordIndex, setActiveWordIndex] = useState(0);

  const [correctWordArray, setCorrectWordArray] = useState([]);

  function processInput(value) {
    if (value.endsWith(" ")) {
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
    <div>
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
        type="text"
        value={userInput}
        onChange={(e) => processInput(e.target.value)}
      />
      <p>Word Count: {activeWordIndex}</p>
    </div>
  );
}

export default App;
