import { useState } from 'react'

const createInitVoteObj = (num) => {
  const obj = {}
  for(let i = 0; i < num; i++) {
    obj[i]=0
  }
  return obj
}

const findMostVote = (obj) => {
  let mostIndex = 0
  Object.keys(obj).forEach(function(key) {
    if (obj[key] > obj[mostIndex]) {
      mostIndex = key
    }
  })
  return mostIndex
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(createInitVoteObj(anecdotes.length))
  const [mostVoteIndex, setMostVoteIndex] = useState(0)
  const handleClickNext = () => {
    let random = Math.round(Math.random()*(anecdotes.length-1))
    setSelected(random)
    // console.log(votes)
  }
  const handleClickVote = () => {
    const newVotes = {
      ...votes
    }
    newVotes[selected]+=1
    setVotes(newVotes)
    setMostVoteIndex(findMostVote(newVotes))
  }
  return (
    <div>
      <h1>Anecdots of the day</h1>
      <div>
        {anecdotes[selected]}
      </div>
      <div>has {votes[selected]} votes</div>
      <button onClick={handleClickVote}>vote</button>
      <button onClick={handleClickNext}>next anecdotes</button>
      <h1>Anecdots with most votes</h1>
      <div>{anecdotes[mostVoteIndex]}</div>
      <div>has {votes[mostVoteIndex]} votes</div>
    </div>
  )
}

export default App