const Header = ({ courseName }) => <h1>{courseName}</h1>

const Part = ({ part }) =>
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => (
  <div>
    {parts.map((part) => <Part key={part.id} part={part}></Part>)}
  </div>

)

const Total = ({ parts }) => {
  const total = parts.reduce((sum, part) => {
    return sum + part.exercises
  }, 0)
  return <p>total of {total} exercises</p>
};

const Course = ({ courses }) => (
  <div>
    {courses.map((course) => (
      <div key={course.id}>
        <Header courseName={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} /> 
      </div>
    ))}
  </div>
)

export default Course