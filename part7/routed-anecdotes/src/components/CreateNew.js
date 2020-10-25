import React from 'react' 
import { useHistory } from 'react-router-dom'
import { useField } from '../hooks'

const CreateNew = (props) => {
  const history = useHistory()
  const content = useField('text')
  const author = useField('text')
  const info = useField('text')

  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    })
    history.push('/')
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input 
            type={content.type}
            value={content.value}
            onChange={content.onChange}
          />
        </div>
        <div>
          author
          <input 
            type={author.type}
            value={author.value}
            onChange={author.onChange}
          />
        </div>
        <div>
          url for more info
          <input 
            type={info.type}
            value={info.value}
            onChange={info.onChange}
          />
        </div>
        <button>create</button>
      </form>
    </div>
  )
}

export default CreateNew