import { useMutation, useQueryClient } from 'react-query'
import { createAnecdote } from '../request'
import { useContext }from 'react'
import NotificationContext from '../NotificationContext'

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const [message, messageDispatch] = useContext(NotificationContext)
  const newAnecdoteMutation = useMutation(
    createAnecdote,
    {
      onSuccess: newAnecdote => {
        const anecdotes = queryClient.getQueryData('anecdotes')
        queryClient.setQueryData('anecdotes', anecdotes.concat(newAnecdote))
      },
      onError: () => {
        messageDispatch({ payload: 'too short anecdote, must have length 5 or more' })
      }
    })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate(
      {
        content,
        votes: 0
      }
    )
    messageDispatch({ payload: `Added '${content}'`})
    setTimeout(() => {
      messageDispatch({ payload: null })
    }, 5000)
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
