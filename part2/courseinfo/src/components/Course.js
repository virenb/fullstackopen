import React from 'react';
import Header from './Header';
import Content from './Content';

const Course = ({ courses }) => {
  console.log(courses.map((course) => course));
  return (
    <>
      <Header name={courses[0].name} />
      <Content parts={courses[0].parts} />

      <Header name={courses[1].name} />
      <Content parts={courses[1].parts} />
    </>
  );
};

export default Course;
