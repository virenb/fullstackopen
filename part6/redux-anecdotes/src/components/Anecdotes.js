import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'

const Anecdote = ({ anecdote, handleClick }) => {
  return (
    <>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={handleClick}>vote</button>
      </div>
    </>
  )
}

const Anecdotes = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state)

  return (
    <>
      <h2>Anecdotes</h2>
        <div>
          {anecdotes
          .sort((a, b) => (a.votes > b.votes ? -1 : 1))
          .map(anecdote =>
            <Anecdote
              key={anecdote.id}
              anecdote={anecdote}
              handleClick={() => dispatch(addVote(anecdote.id))}
            />
          )}
        </div>
    </>
  )
}

export default Anecdotes