import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Button = ({ onClick, name }) => {
  return <button onClick={onClick}>{name}</button>;
};

const Statistic = ({ text, value }) => {
  return (
    <div>
      {text} {value}
    </div>
  );
};

const Statistics = ({ good, neutral, bad, total, score }) => {
  return (
    <>
      <h2>statistics</h2>
      <Statistic text='good' value={good} />
      <Statistic text='neutral' value={neutral} />
      <Statistic text='bad' value={bad} />
      <Statistic text='total' value={total} />
      <Statistic text='average' value={score === 0 ? 0 : score / total} />
      <Statistic
        text='positive'
        value={total === 0 ? 0 : (good / total) * 100 + '%'}
      />
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
      {total === 0 ? (
        <>
          <h2>statistics</h2>
          <p>no feedback given</p>
        </>
      ) : (
        <Statistics
          good={good}
          neutral={neutral}
          bad={bad}
          total={total}
          score={score}
        />
      )}
    </>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
