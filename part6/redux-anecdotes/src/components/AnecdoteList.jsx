import { useSelector, useDispatch } from 'react-redux'
import { takeVoteAnecdote, sortAnecdotesAct } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote, vote }) => {
    return (
        <div>
            <div>
            {anecdote.content}
            </div>
            <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
            </div>
        </div>
    )
}

const AnecdoteList = () => {
    const anecdotes = useSelector(state => {
        if (state.filter === null) {
            return state.anecdotes
        }
        return state.anecdotes.filter(anecdote => 
            anecdote.content.toLowerCase().includes(state.filter.toLowerCase()))
    })
    const dispatch = useDispatch()

    const vote = (item) => {
        // console.log('vote', id)
        dispatch(takeVoteAnecdote(item))
        dispatch(sortAnecdotesAct())
        dispatch(setNotification(`you voted '${item.content}'`, 5))
      }

    return (
        <div>
            {anecdotes.map(anecdote =>
                <Anecdote key={anecdote.id} anecdote={anecdote} vote={vote}></Anecdote>
            )}
        </div>
    )
}

export default AnecdoteList