import React from 'react';
import ReactDOM from 'react-dom';

const Header = (props) => {
  return <h1>{props.course}</h1>;
};

const Part = (props) => {
  return (
    <>
      <p>
        {props.name1} {props.exercises1}
      </p>
      <p>
        {props.name2} {props.exercises2}
      </p>
      <p>
        {props.name3} {props.exercises3}
      </p>
    </>
  );
};

const Content = (props) => {
  return (
    <div>
      <Part
        name1={props.name1}
        exercises1={props.exercises1}
        name2={props.name2}
        exercises2={props.exercises2}
        name3={props.name3}
        exercises3={props.exercises3}
      />
    </div>
  );
};

const Total = (props) => {
  return <p>Number of exercises {props.exercises}</p>;
};

const App = () => {
  const course = 'Half Stack application development';
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10,
  };
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7,
  };
  const part3 = {
    name: 'State of a component',
    exercises: 14,
  };

  return (
    <div>
      <Header course={course} />
      <Content
        name1={part1.name}
        exercises1={part1.exercises}
        name2={part2.name}
        exercises2={part2.exercises}
        name3={part3.name}
        exercises3={part3.exercises}
      />
      <Total
        exercises={part1['exercises'] + part2['exercises'] + part3['exercises']}
      />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
