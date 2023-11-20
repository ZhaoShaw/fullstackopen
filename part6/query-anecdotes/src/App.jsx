import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { getAll, voteAnecdote } from './request'
import { useContext } from 'react'
import NotificationContext from './NotificationContext'

const App = () => {
  const queryClient = useQueryClient()
  const [message, messageDispatch] = useContext(NotificationContext)
  const result = useQuery(
    'anecdotes',
    getAll,
    {
      retry: false,
      refetchOnWindowFocus: false
    })

    const voteMutation = useMutation(
      voteAnecdote,
      {
        onSuccess: newAnecdote => {
          const anecdotes = queryClient.getQueryData('anecdotes')
          queryClient.setQueryData(
            'anecdotes',
            anecdotes.map(item => item.id === newAnecdote.id ?
              newAnecdote : item
            )
          )
        }
      }
    )

  if (result.isLoading) {
    return <div>loading data ...</div>
  }
  
  if (result.isError) {
    return <div>anecdotes service not available due to problems in server</div>
  }
  const anecdotes = result.data

  const handleVote = (anecdote) => {
    voteMutation.mutate(anecdote)
    messageDispatch({ payload: `vote '${anecdote.content}'` })
    setTimeout(() => {
      messageDispatch({ payload: null })
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
