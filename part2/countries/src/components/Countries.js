import React from 'react';

const Countries = ({ country }) => {
  return (
    <>
      <div key={country.alpha3Code}>{country.name}</div>
    </>
  );
};

export default Countries;
