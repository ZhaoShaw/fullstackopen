import { useState, useEffect } from 'react'
import requestService from './services/requestService'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'

const App = () => {
  useEffect(() => {
    requestService
      .getAll()
      .then(response => {
        setPersons(response)
      })
  }, [])
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhoneNumber, setNewPhoneNumber] = useState('')
  const [searchName, setSearchName] = useState('')
  const [message, setMessage] = useState(null)


  const showPersons = (searchName === '')
    ? persons
    : persons.filter((person) => person.name.toLowerCase() === searchName.toLowerCase())

  const handleSearchName = (event) => {
    setSearchName(event.target.value)
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handlePhoneNumberChange = (event) => {
    setNewPhoneNumber(event.target.value)
  }

  const notificationReset = () => {
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  const handleDelPerson = (event) => {
    let delPerson = persons.find(person => person.id === event.target.value)
    // console.log(delPerson);
    let delConfirm = window.confirm(`Delete ${delPerson.name}`)
    if (delConfirm) {
      requestService
      .deletePerson(event.target.value)
      .then(response => {
        // console.log(response);
        requestService
          .getAll()
          .then(response => {
            setMessage(`Delete ${delPerson.name}`)
            notificationReset()
            setPersons(response)
        })
      })
    }
  }

  const addPerson = (event) => {
    event.preventDefault()
    let findSamePerson = persons.find((person) => person.name.toLowerCase() === newName.toLowerCase())
    if (findSamePerson) {
      let sameConfirm = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
      if (sameConfirm) {
        const updatePerson = {
          ...findSamePerson,
          number: newPhoneNumber
        }
        requestService
          .update(findSamePerson.id, updatePerson)
          .then(response => {
            requestService
              .getAll()
              .then(response => {
                setMessage(`Updated ${updatePerson.name} number`)
                notificationReset()
                setPersons(response)
                setNewName('')
                setNewPhoneNumber('')
              })
          })
          .catch(error => {
            setMessage(`Person validation failed: ${error}`)
            notificationReset()
            requestService
              .getAll()
              .then(response => {
                setPersons(response)
                setNewName('')
                setNewPhoneNumber('')
              })
          })
      }
    } else {
      const newPerson = {
        name: newName,
        number: newPhoneNumber
      }
      requestService
        .create(newPerson)
        .then(response => {
          setMessage(`Added ${newPerson.name}`)
          notificationReset()
          setPersons(persons.concat(response))
          setNewName('')
          setNewPhoneNumber('')
        })
        .catch(error => {
          setMessage(`Person validation failed: ${error}`)
          notificationReset()
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter searchName={searchName} handleSearchName={handleSearchName}></Filter>
      <h2>add a new</h2>
      <PersonForm addPerson={addPerson} newName={newName} newPhoneNumber={newPhoneNumber} handleNameChange={handleNameChange} handlePhoneNumberChange={handlePhoneNumberChange}></PersonForm>
      <h2>Numbers</h2>
      <Persons showPersons={showPersons} handleDelPerson={handleDelPerson}></Persons>
    </div>
  )
}

export default App