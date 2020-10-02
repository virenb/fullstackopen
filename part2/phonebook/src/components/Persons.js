import React from 'react';

const Persons = ({ phoneFilter, persons }) => {
  return (
    <>
      {phoneFilter
        ? persons
            .filter((person) =>
              person['name'].toLowerCase().startsWith(phoneFilter.toLowerCase())
            )
            .map((person) => (
              <div key={person.name}>
                {person.name} {person.number}
              </div>
            ))
        : persons.map((person) => (
            <div key={person.name}>
              {person.name} {person.number}
            </div>
          ))}
    </>
  );
};

export default Persons;
