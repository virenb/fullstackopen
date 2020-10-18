import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import Blog from './Blog';

test('renders author and title only by default', () => {
  const blog = {
    title: 'React Testing Library Roolz',
    author: 'React Tester',
    url: 'react-testing.org',
    likes: 420,
  };

  const component = render(
    <Blog blog={blog} />,
  );

  expect(component.container).toHaveTextContent(
    'React Testing Library Roolz',
    'React Tester',
  );
  expect(component.container).not.toHaveTextContent(
    'react-testing.org',
    '420',
  );
});

test('clicking the button shows a blogs likes and url', () => {
  const blog1 = {
    title: 'React Testing Library is Fun',
    author: 'React Tester',
    url: 'react-testing.org',
    likes: 421,
    user: {
      name: 'Bob Bob',
      username: 'bob123',
    },
  };

  const user = {
    name: 'Bob Bob',
    username: 'bob123',
  };

  const mockHandler = jest.fn();

  const component = render(
    <Blog blog={blog1} displayMore={mockHandler} user={user} />
  );

  const button = component.getByText('view');
  fireEvent.click(button);

  expect(component.container).toHaveTextContent('react-testing.org', '421');
});
