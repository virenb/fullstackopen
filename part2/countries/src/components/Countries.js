import React from 'react';

const Countries = ({ countries, handleCountryClick }) => {
  return (
    <div>
      {countries.map((c) => (
        <div key={c.alpha2Code}>
          {c.name}{' '}
          <button onClick={handleCountryClick} id={c.name}>
            show
          </button>
        </div>
      ))}
    </div>
  );
};

export default Countries;
