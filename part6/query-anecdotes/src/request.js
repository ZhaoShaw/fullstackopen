import axios from 'axios'
const baseUrl = 'http://localhost:3001/anecdotes'

export const getAll = async () => {
  const res = await axios.get(baseUrl)
  return res.data
}

export const createAnecdote = async anecdote => {
    const res =  await axios.post(baseUrl, anecdote)
    return res.data
}

export const voteAnecdote = async anecdote => {
    const newAnecdote = {
        ...anecdote,
        votes: anecdote.votes + 1
    }
    const res = await axios.put(`${baseUrl}/${anecdote.id}`, newAnecdote)
    return res.data
}