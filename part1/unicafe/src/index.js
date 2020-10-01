import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Button = ({ onClick, name }) => {
  return <button onClick={onClick}>{name}</button>;
};

const Statistics = ({ good, neutral, bad, total, score }) => {
  return (
    <>
      <h2>statistics</h2>
      <div>good {good}</div>
      <div>neutral {neutral}</div>
      <div>bad {bad}</div>
      <div>all {total}</div>
      <div>average {score === 0 ? 0 : score / total}</div>
      <div>positive {total === 0 ? 0 : (good / total) * 100 + '%'}</div>
    </>
  );
};

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [total, setTotal] = useState(0);
  const [score, setScore] = useState(0);

  const handleGoodClick = () => {
    setGood(good + 1);
    setTotal(total + 1);
    setScore(score + 1);
  };

  const handleNeutralClick = () => {
    setNeutral(neutral + 1);
    setTotal(total + 1);
    setScore(score + 0);
  };

  const handleBadClick = () => {
    setBad(bad + 1);
    setTotal(total + 1);
    setScore(score - 1);
  };

  return (
    <>
      <h1>give feedback</h1>
      <Button name='good' onClick={handleGoodClick} />
      <Button name='neutral' onClick={handleNeutralClick} />
      <Button name='bad' onClick={handleBadClick} />
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        total={total}
        score={score}
      />
    </>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
