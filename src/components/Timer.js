import React, { useEffect, useState } from "react";

const Timer = (props) => {
  const [timeElapsed, setTimeElapsed] = useState(0);
  const { correctWords, startCounting } = props;
  useEffect(() => {
    let id;
    if (startCounting) {
      id = setInterval(() => {
        setTimeElapsed((oldTime) => oldTime + 1);
      }, 1000);
    }

    return () => {
      clearInterval(id);
    };
  }, [startCounting]);

  const minutes = timeElapsed / 60;

  return (
    <div>
      <p>
        <b>Time:</b> {timeElapsed}s
      </p>
      <p>
        <b>Speed:</b> {Math.round(correctWords / minutes) || 0} wpm
      </p>
    </div>
  );
};

export default Timer;
