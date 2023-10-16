import { useState, useEffect } from 'react'
import { SearchFilter } from './components/SearchFilter';
import { PersonForm } from './components/PersonForm';
import { Persons } from './components/Persons';
import personsService from './services/persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [nameFilter, setNameFilter] = useState('');

  useEffect(() => {
    personsService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons);
      });
  }, []);

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
    const existingPerson = persons.find(person => newName === person.name);
    if(existingPerson){
      if(confirm(`${existingPerson.name} is already added to the phonebook, replace the old number with a new one?`)){
        const updatedPerson = {
          ...existingPerson, 
          number: newNumber
        };
        personsService
          .update(updatedPerson.id, updatedPerson)
          .then(returnedData => {
            setPersons(persons.map(p => p.id !== updatedPerson.id ? p : returnedData));
          })
      };
    } else {
      const personObject = {
        number: newNumber,
        name: newName
      };

      personsService
        .create(personObject)
        .then(addedPerson => {
          setPersons(persons.concat(addedPerson));
          setNewName('');
          setNewNumber('');
        });
    }
  }

  const handleDelete = id => {
    const personToDelete = persons.find(person => person.id === id);
    if(confirm(`Delete ${personToDelete.name}?`)){
      personsService
        .delete(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id));
        })
    }
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
      <Persons nameFilter={nameFilter} persons={persons} handleDelete={handleDelete}/>
    </div>
  )
}

export default App