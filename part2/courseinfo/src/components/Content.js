import React from 'react';
import Part from './Part';

const Content = ({ parts }) => {
  return (
    <>
      <div>
        {parts.map((part, id) => {
          return (
            <Part key={part.id} name={part.name} exercise={part.exercises} />
          );
        })}
      </div>
      <div>
        <strong>
          total of {parts.map((a) => a['exercises']).reduce((a, b) => a + b)}{' '}
          exercises
        </strong>
      </div>
    </>
  );
};

export default Content;
