import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'

const Anecdote = ({anecdote, handleClick }) => {
  return (
    <div>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={handleClick}>vote</button>
      </div>
    </div>
  )
}

const AnecdoteList = () => {
  const sortFn = (a, b) => {
    return b.votes - a.votes
  }

  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state.sort(sortFn))

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <Anecdote
          key={anecdote.id}
          handleClick={() => dispatch(voteAnecdote(anecdote.id))}
          anecdote={anecdote}
        />
      )}
    </div>
  )
}

export default AnecdoteList;
