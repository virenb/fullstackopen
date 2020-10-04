import React from 'react';

const Filter = ({ countryFilter, handleFilterChange }) => {
  return (
    <>
      <div>
        find countries{' '}
        <input
          type='text'
          value={countryFilter}
          onChange={handleFilterChange}
        />
      </div>
    </>
  );
};

export default Filter;
