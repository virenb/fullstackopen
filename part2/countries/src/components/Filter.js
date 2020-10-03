import React from 'react';
import Country from './Country';
import Countries from './Countries';

const Filter = ({ country, handleChange, matchingCountries }) => {
  return (
    <>
      <div>
        find countries{' '}
        <input type='text' onChange={handleChange} value={country} />
      </div>
      {matchingCountries.length > 10 ? (
        <p>Too many matches, specify another filter</p>
      ) : (
        matchingCountries.map((country) => <Countries country={country} />)
      )}
      {matchingCountries.length === 1 ? (
        <Country matchingCountries={matchingCountries} />
      ) : null}
    </>
  );
};

export default Filter;
