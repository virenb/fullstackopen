import React from 'react';

const Part = ({ id, name, exercise }) => {
  return (
    <p key={id}>
      {' '}
      {name} {exercise}
    </p>
  );
};

export default Part;
