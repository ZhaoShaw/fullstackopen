import axios from 'axios'
const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async() => {
    const res = await axios.get(baseUrl)
    return res.data
}

const createAnecdote = async(anecdote) => {
    const newAnecdote = {
        content: anecdote,
        votes: 0
    }
    const res = await axios.post(baseUrl, newAnecdote)
    return res.data
}

const voteAnecdote = async anecdote => {
    const res = await axios.put(`${baseUrl}/${anecdote.id}`, anecdote)
    return res.data
}

export default { getAll, createAnecdote, voteAnecdote }