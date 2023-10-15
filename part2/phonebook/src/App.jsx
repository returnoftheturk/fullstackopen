import { useState } from 'react'
import { SearchFilter } from './components/SearchFilter';
import { PersonForm } from './components/PersonForm';
import { Persons } from './components/Persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [nameFilter, setNameFilter] = useState('');

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  }
  const handleFilterChange = (event) => {
    setNameFilter(event.target.value);
  }

  const handleSubmit = event => {
    event.preventDefault();
    const existingName = persons.find(person => newNumber === person.phoneNumber);
    if(existingName){
      alert(`${existingName.number} is already added to the phonebook`);
    } else {
      setPersons(persons.concat({
        phoneNumber: newNumber,
        name: newName,
        id: persons.length
      }));
    }
    setNewName('');
    setNewNumber('');
  }



  return (
    <div>
      <h2>Phonebook</h2>

      <SearchFilter nameFilter={nameFilter} handleFilterChange={handleFilterChange}/>

      <h3>Add a new</h3>
      <PersonForm 
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        handleSubmit={handleSubmit}
      />

      <h3>Numbers</h3>
      <Persons nameFilter={nameFilter} persons={persons}/>
    </div>
  )
}

export default App