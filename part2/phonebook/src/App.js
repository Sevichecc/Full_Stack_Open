import { useEffect, useState } from 'react'
import personService from './services/persons'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [info, setInfo] = useState({ message: null })

  useEffect(() => {
    personService.getAll().then(initialPersons => setPersons(initialPersons))
  }, [])

  const hasName
    = persons.length !== 0 && persons.some(persons => persons.name === newName)

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const notifyWith = (message, type = 'info') => {
    setInfo({
      message,
      type,
    })
    setTimeout(() => {
      setInfo({ message: null })
    }, 3000)
  }

  const addPesrson = (event) => {
    event.preventDefault()

    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    }
    personService
      .create(personObject)
      .then((returnedPersons) => {
        setPersons(persons.concat(returnedPersons))
        setNewName('')
        setNewNumber('')
        notifyWith(`Added ${newName}`)
      })
      .catch((err) => {
        notifyWith(`${err.response.data.error}`, 'error')
      })
  }

  const updatePerson = (event) => {
    event.preventDefault()
    if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
    ) {
      const person = persons.find(person => person.name === newName)
      const { id, name } = person
      const changePerson = { ...person, number: newNumber }
      personService
        .update(id, changePerson)
        .then((returnedPersons) => {
          setPersons(persons.map(p => (p.id !== id ? p : returnedPersons)))
          setNewName('')
          setNewNumber('')
          notifyWith(`phone number of ${name} updated!`)
        })
        .catch(() =>
          notifyWith(`${name} has already been removed`, 'error'),
        )
    }
  }

  const removePerson = (id) => {
    const deletePerson = persons.find(person => person.id === id).name

    if (window.confirm(`Delete ${deletePerson} ?`)) {
      personService
        .remove(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
          notifyWith(`number of ${deletePerson} deleted!`)
        })
        .catch((err) => {
          if (err.response.status === 404)
            notifyWith(`${deletePerson} has already been removed`, 'error')
        })
    }
  }

  const personsToShow = filter
    ? persons.filter(person => person.name.match(new RegExp(filter, 'gi')))
    : persons

  return (
   <div>
      <h2>Numberbook</h2>
      <Notification info={info} />
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <h2>Add a Note</h2>
      <PersonForm
        hasName={hasName}
        updatePerson={updatePerson}
        addPesrson={addPesrson}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} removePerson={removePerson} />
    </div>
  )
}

export default App
