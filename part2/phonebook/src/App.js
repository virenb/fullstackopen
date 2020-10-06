import React, { useState, useEffect } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import Notification from './components/Notification';
import personService from './services/persons';
import './index.css';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [phoneFilter, setFilter] = useState('');
  const [deleted, setDeleted] = useState(false);
  const [updated, setUpdated] = useState(false);
  const [updateMessage, setUpdateMessage] = useState(null);

  useEffect(() => {
    personService.getAll().then((response) => {
      setPersons(response.data);
    });
  }, [deleted, updated]);

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const checkPersons = persons.map(({ name }) => name);
    if (checkPersons.includes(newName)) {
      let personToUpdate = persons.filter((p) => p.name == newName);
      // console.log('personToUpdate ', personToUpdate);
      // console.log('personToUpdate id ', personToUpdate[0].id);
      let updateAlert = window.confirm(
        `${newName} is already added to phonebook, replace old number with new one?`
      );
      alert(updateAlert);
      // console.log(event.target[1].value);
      personService
        .update(personToUpdate[0].id, {
          name: personToUpdate[0].name,
          number: event.target[1].value,
        })
        .then(() => {
          setPersons([...persons]);
          setUpdated(true);
          setUpdateMessage(`${personToUpdate[0].name} has been updated`);
          setTimeout(() => {
            setUpdateMessage(null);
          }, 5000);
        })
        .catch((err) => {
          console.log(err);
        });
      setNewName('');
      setNewNumber('');
      setUpdated(false);
      return false;
    }
    if (newName && newNumber) {
      const personObject = {
        name: newName,
        number: newNumber,
      };
      personService.create(personObject).then((response) => {
        setPersons(persons.concat(response.data));
        console.log(persons);
        setUpdateMessage(`Added ${personObject.name}`);
        setTimeout(() => {
          setUpdateMessage(null);
        }, 5000);
        setNewName('');
        setNewNumber('');
      });
    }
  };

  const handleDelete = (id) => {
    // console.log(id);
    let user = persons.filter((p) => p.id == id);
    // console.log(user);
    let confirmUser = window.confirm(`Delete ${user[0].name} ?`);
    alert(confirmUser);
    personService
      .deleteUser(id)
      .then(() => setDeleted(true))
      .then(() => setPersons(persons.filter((p) => p.id !== id)));
    setDeleted(false);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        phoneFilter={phoneFilter}
        handleFilterChange={handleFilterChange}
      />
      <Notification message={updateMessage} />
      <h2>Add a new</h2>
      <PersonForm
        handleSubmit={handleSubmit}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        newName={newName}
        newNumber={newNumber}
      />
      <h3>Numbers</h3>
      <Persons
        persons={persons}
        phoneFilter={phoneFilter}
        handleDelete={(event) => handleDelete(event.target.id)}
      />
    </div>
  );
};

export default App;
