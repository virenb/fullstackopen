import React, { useState, useEffect } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import personService from './services/persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [phoneFilter, setFilter] = useState('');

  useEffect(() => {
    personService.getAll().then((response) => {
      setPersons(response.data);
    });
  }, [persons]);

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
      alert(`${newName} is already added to phonebook`);
      return false;
    }
    if (newName && newNumber) {
      const personObject = {
        name: newName,
        number: newNumber,
      };
      personService.create(personObject).then((response) => {
        setPersons(persons.concat(response.data));
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
    personService.deleteUser(id).then(() => {
      return setPersons(persons.filter((p) => p.id !== id));
    });
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        phoneFilter={phoneFilter}
        handleFilterChange={handleFilterChange}
      />

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
