import React from 'react';

const Country = ({ matchingCountries }) => {
  return (
    <>
      <h1>{matchingCountries[0].name}</h1>
      <div>capital {matchingCountries[0].capital}</div>
      <div>population {matchingCountries[0].population}</div>
      <h2>languages</h2>
      <ul>
        {matchingCountries[0].languages.map((lang) => (
          <li key={lang.iso639_2}>{lang.name}</li>
        ))}
      </ul>
      <img
        src={matchingCountries[0].flag}
        alt={matchingCountries[0].name}
        width='150'
        height='75'
      />
    </>
  );
};

export default Country;
