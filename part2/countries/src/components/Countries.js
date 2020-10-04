import React from 'react';

const Countries = ({ countries }) => {
  return (
    <div>
      {countries.map((c) => (
        <div key={c.alpha2Code}>{c.name}</div>
      ))}
    </div>
  );
};

export default Countries;
