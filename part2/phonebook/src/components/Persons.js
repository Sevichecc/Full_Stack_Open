const Persons = ({ personsToShow, removePerson }) => {
  return (
    <>
      {personsToShow.map(person => (
        <div key={person.id}>
          <span>
            {person.name} {person.number}
          </span>
          <button onClick={() => removePerson(person.id)}>delete</button>
        </div>
      ))}
    </>
  )
}

export default Persons
