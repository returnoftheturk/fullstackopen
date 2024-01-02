import { useState, useEffect } from 'react'
import { SearchFilter } from './components/SearchFilter';
import { PersonForm } from './components/PersonForm';
import { Persons } from './components/Persons';
import personsService from './services/persons';
import { Notification } from './components/Notification';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [nameFilter, setNameFilter] = useState('');
  const [notificationMessage, setNotificationMessage] = useState({});

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
            setNotificationMessage(
              {
                message: `Modified ${updatedPerson.name}'s number`,
                isError: false
              }
            );
            setTimeout(() => {
              setNotificationMessage({});
            }, 5000);
            setPersons(persons.map(p => p.id !== updatedPerson.id ? p : returnedData));
          }).catch(err => {
            setNotificationMessage(
              {
                message: err?.response?.data?.error || 'Unable to complete operation',
                isError: true
              }
            );
            setTimeout(() => {
              setNotificationMessage({});
            }, 5000);
          });
      };
    } else {
      const personObject = {
        number: newNumber,
        name: newName
      };

      personsService
        .create(personObject)
        .then(addedPerson => {
          setNotificationMessage(
            `Added ${addedPerson.name}'s number`
          );
          setTimeout(() => {
            setNotificationMessage(null);
          }, 5000);
          setPersons(persons.concat(addedPerson));
          setNewName('');
          setNewNumber('');
        }).catch(err => {
          setNotificationMessage(
            {
              message: err?.response?.data?.error || 'Unable to complete operation',
              isError: true
            }
          );
          setTimeout(() => {
            setNotificationMessage({});
          }, 5000);
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
        }).catch(err => {
          setNotificationMessage(
            {
              message: `Something went wrong`,
              isError: true
            }
          );
          setTimeout(() => {
            setNotificationMessage({});
          }, 5000);
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notificationMessage} />

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