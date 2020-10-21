import React from 'react'
import AnecdoteForm from './components/AnecdoteForm'
import Anecdotes from './components/Anecdotes'

const App = () => {

  return (
    <div>
      <Anecdotes />
      <AnecdoteForm />
    </div>
  )
}

export default App