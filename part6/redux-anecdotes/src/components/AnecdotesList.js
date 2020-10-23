import React from 'react'
// import { useDispatch, useSelector } from 'react-redux'
import { connect } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

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

const AnecdotesList = (props) => {
  // const dispatch = useDispatch()
  // const anecdotes = useSelector(state => state.anecdotes)
  // const filter = useSelector(state => state.filter)

  return (
    <>
        <div>
          {props.filter === '' ? props.anecdotes
            .sort((a, b) => (a.votes > b.votes ? -1 : 1))
            .map(anecdote =>
              <Anecdote
                key={anecdote.id}
                anecdote={anecdote}
                handleClick={() => 
                {
                  props.addVote(anecdote.id)
                  props.setNotification(`you voted for ${anecdote.content}`, 5)
                }
                }
              />
            )
            :
            props.anecdotes
            .filter(anecdote => {return anecdote.content.toLowerCase().includes(props.filter)})
            .sort((a, b) => (a.votes > b.votes ? -1 : 1))
            .map(anecdote =>
              <Anecdote
                key={anecdote.id}
                anecdote={anecdote}
                handleClick={() => 
                {
                  props.addVote(anecdote.id)
                  props.setNotification(`you voted for ${anecdote.content}`, 5)
                }
                }
              />
            )
          }
        </div>
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes,
    filter: state.filter
  }
}

const mapDispatchToProps = {
  addVote, setNotification
}

const ConnectedAnecdotes = connect(mapStateToProps, mapDispatchToProps)(AnecdotesList)
export default ConnectedAnecdotes