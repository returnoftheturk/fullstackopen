import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, updateAnecdote } from './requests'
import { useNotificationDispatch } from './NotificationContext'

const App = () => {
  const queryClient = useQueryClient()
  const dispatchNotification = useNotificationDispatch();

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    refetchOnWindowFocus: false
  })

  const updatedAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: (updatedAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes']);
      queryClient.setQueryData(['anecdotes'], anecdotes.map(anecdote => anecdote.id === updatedAnecdote.id ? updatedAnecdote : anecdote))
    },
  })

  let anecdotes;
  if ( result.isLoading ) {
    return <div>loading data...</div>
  } else if (result.isError) {
    return <div>anecdote service is not available due to problems in server.</div>
  } else {
    anecdotes = result.data
  }

  const handleVote = (anecdote) => {
    updatedAnecdoteMutation.mutate({...anecdote, votes: anecdote.votes + 1});
    dispatchNotification({type: 'SET_NOTIFICATION', payload: `anecdote ${anecdote.content} voted`})
    setTimeout(() => {
      dispatchNotification({type: 'CLEAR_NOTIFICATION'})
    }, 5000)
  }

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
