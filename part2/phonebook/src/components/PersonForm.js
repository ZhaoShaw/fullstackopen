const PersonForm = ({addPerson, newName, newPhoneNumber, handleNameChange, handlePhoneNumberChange}) => (
  <form onSubmit={addPerson}>
    <div>
        name: <input value={newName} onChange={handleNameChange}/>
    </div>
    <div>
        number: <input value={newPhoneNumber} onChange={handlePhoneNumberChange}/>
    </div>
    <div>
        <button type="submit">add</button>
    </div>
  </form>
)

export default PersonForm