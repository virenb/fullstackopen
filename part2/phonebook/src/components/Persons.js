import React from 'react';

const Persons = ({ phoneFilter, persons, handleDelete }) => {
  return (
    <>
      {phoneFilter
        ? persons
            .filter((person) =>
              person['name'].toLowerCase().startsWith(phoneFilter.toLowerCase())
            )
            .map((person) => (
              <div key={person.name}>
                {person.name} {person.number}{' '}
                <button onClick={handleDelete} id={person.id}>
                  delete
                </button>
              </div>
            ))
        : persons.map((person) => (
            <div key={person.name}>
              {person.name} {person.number}{' '}
              <button onClick={handleDelete} id={person.id}>
                delete
              </button>
            </div>
          ))}
    </>
  );
};

export default Persons;
