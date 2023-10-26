const Persons = ({showPersons, handleDelPerson}) => (
  <div>
    {showPersons.map((person) => (
      <div key={person.name}>
      <p>
        {person.name} {person.number}
      </p>
      <button value={person.id} onClick={handleDelPerson}>delete</button>
      </div>
    ))}
  </div>
)

export default Persons