import React from 'react';

const Filter = ({ phoneFilter, handleFilterChange }) => {
  return (
    <div>
      filter shown with{' '}
      <input value={phoneFilter} onChange={handleFilterChange} />
    </div>
  );
};

export default Filter;
