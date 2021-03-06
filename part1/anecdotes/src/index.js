import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Button = ({ onClick, text }) => {
  return <button onClick={onClick}>{text}</button>;
};

const App = ({ anecdotes }) => {
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState([0, 0, 0, 0, 0, 0]);
  const [mostVotes, setMostVotes] = useState(0);

  const handleClick = () => {
    let num = Math.floor(Math.random() * (5 - 0 + 1)) + 0;
    setSelected(num);
  };

  const handleVote = () => {
    setVotes(((votes[selected] += 1), [...votes]));
    setMostVotes(votes.indexOf(Math.max(...votes)));
  };

  return (
    <>
      {anecdotes[selected]}
      <br />
      has {votes[selected]} votes
      <br />
      <Button onClick={handleVote} text='vote' />
      <Button onClick={handleClick} text='next anecdote' />
      <h2>Anecdote with most votes</h2>
      <p>{anecdotes[mostVotes]}</p>
      <p>has {votes[mostVotes]} votes</p>
    </>
  );
};

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById('root'));
