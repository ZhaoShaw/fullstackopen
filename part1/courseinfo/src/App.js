const Header = (props) => (
    <>
        <h1>
            {props.courseName}
        </h1>
    </>
)

const Part = (props) => (
    <>
        <p>
            {props.partName} {props.partNumber}
        </p>
    </>
)

const Content = (props) => (
    // const part = props.parts.map(value => (<Part partName={value.name} partNumber={value.exercises}/>))
    <>
        <Part partName={props.parts[0].name} partNumber={props.parts[0].exercises} />
        <Part partName={props.parts[1].name} partNumber={props.parts[1].exercises} />
        <Part partName={props.parts[2].name} partNumber={props.parts[2].exercises} />
    </>

)

const Total = (props) => (
    <>
        <p>
            Number of exercises {props.parts[0].exercises} + {props.parts[1].exercises} + {props.parts[2].exercises}
        </p>
    </>
)


const App = () => {
    const course = {
        name: 'Half Stack application development',
        parts: [
            {
                name: 'Fundamentals of React',
                exercises: 10
            },
            {
                name: 'Using props to pass data',
                exercises: 7
            },
            {
                name: 'State of a component',
                exercises: 14
            }
        ]
    }
    return (
        <>
            <Header courseName={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </>
    )
  }
  
  export default App