import { useState } from 'react'
const Button = (props) => (
  <button onClick={props.handleClick}>{props.buttonShowName}</button>
)

const StatisticLine = ({statisticName, statisticNumber}) => (
  <tr>
    <th>{statisticName}</th>
    <th>{statisticNumber}</th>
  </tr>
)

const Statistics = ({good, neutral, bad}) => {
  if (good === 0 && neutral === 0 && bad === 0) {
    return (
      <div>
        <h1>statistic</h1>
        <div>No feedback given</div>
      </div>
    )
  } else {
    return (
      <div>
        <h1>statistic</h1>
        <table>
          <tbody>
            <StatisticLine statisticName="good" statisticNumber={good}/>
            <StatisticLine statisticName="neutral" statisticNumber={neutral}/>
            <StatisticLine statisticName="bad" statisticNumber={bad}/>
            <StatisticLine statisticName="all" statisticNumber={good + neutral + bad}/>
            <StatisticLine statisticName="average" statisticNumber={(good - bad)/(good + neutral + bad)}/>
            <StatisticLine statisticName="positive" statisticNumber={good/(good + neutral + bad)}/>
          </tbody>
        </table>
      </div>
    )
  }
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleClick = (value) => () => {
    if (value === 'good') {
      setGood(good + 1)
    }
    if (value === 'neutral') {
      setNeutral(neutral + 1)
    }
    if (value === 'bad') {
      setBad(bad + 1)
    }
  } 

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleClick('good')} buttonShowName="good" />
      <Button handleClick={handleClick('neutral')} buttonShowName="neutral" />
      <Button handleClick={handleClick('bad')} buttonShowName="bad" />
      <Statistics good={good} neutral={neutral} bad={bad}></Statistics>
    </div>
  )
}

export default App