import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { setNotification, removeNotification } from '../reducers/notificationReducer'

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

const AnecdotesList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state.anecdotes)

  return (
    <>
        <div>
          {anecdotes
          .sort((a, b) => (a.votes > b.votes ? -1 : 1))
          .map(anecdote =>
            <Anecdote
              key={anecdote.id}
              anecdote={anecdote}
              handleClick={() => 
              {
                dispatch(addVote(anecdote.id))
                dispatch(setNotification(`you voted for ${anecdote.content}`))
                setTimeout(() => {
                  dispatch(removeNotification(''))
                }, 2000)
              }
              }
            />
          )}
        </div>
    </>
  )
}

export default AnecdotesList