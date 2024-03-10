import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

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
  const dispatch = useDispatch()

  const sortFn = (a, b) => {
    return b.votes - a.votes
  }

  const handleVote = (anecdote) => {
    dispatch(voteAnecdote(anecdote.id))
    dispatch(setNotification(`You voted ${anecdote.content}`, 2))
  }

  const anecdotes = useSelector(state => {
    const filter = state.filter.toLowerCase();
    const sortedAnecdotes = [...state.anecdotes].sort(sortFn);
    if(filter) {
      return sortedAnecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter))
    }
    return sortedAnecdotes
  })

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <Anecdote
          key={anecdote.id}
          handleClick={() => handleVote(anecdote)}
          anecdote={anecdote}
        />
      )}
    </div>
  )
}

export default AnecdoteList;
