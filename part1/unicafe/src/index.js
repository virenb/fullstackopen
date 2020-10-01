import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Button = ({ onClick, name }) => {
  return <button onClick={onClick}>{name}</button>;
};

const App = () => {
  const handleGoodClick = () => {
    setGood(good + 1);
  };

  const handleNeutralClick = () => {
    setNeutral(neutral + 1);
  };

  const handleBadClick = () => {
    setBad(bad + 1);
  };

  // save clicks of each button to own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <>
      <h1>give feedback</h1>
      <Button name='good' onClick={handleGoodClick} />
      <Button name='neutral' onClick={handleNeutralClick} />
      <Button name='bad' onClick={handleBadClick} />
      <h2>statistics</h2>
      <div>good {good}</div>
      <div>neutral {neutral}</div>
      <div>bad {bad}</div>
    </>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
