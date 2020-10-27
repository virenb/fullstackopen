import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import Blog from './Blog';

const testBlog = {
  title: 'React Testing Library is Fun',
  author: 'React Tester',
  url: 'react-testing.org',
  likes: 215,
  user: {
    name: 'Bob Bob',
    username: 'bob123',
  },
};

const testUser = {
  name: 'Bob Bob',
  username: 'bob123',
};

test('renders author and title only by default', () => {
  const component = render(
    <Blog blog={testBlog} />,
  );

  expect(component.container).toHaveTextContent(
    'React Tester',
    'React Testing Library is Fun',
  );
  expect(component.container).not.toHaveTextContent(
    'react-testing.org',
    '215',
  );
});

test('clicking the button shows a blogs likes and url', () => {
  const mockHandler = jest.fn();

  const component = render(
    <Blog blog={testBlog} displayMore={mockHandler} user={testUser} />,
  );

  const button = component.getByText('view');
  fireEvent.click(button);

  expect(component.container).toHaveTextContent('react-testing.org', '215');
});

test('clicking the like button twice increases the likes count + 2', () => {
  const mockHandler = jest.fn();
  const mockHandler2 = jest.fn();

  const component = render(
    <Blog blog={testBlog} displayMore={mockHandler} user={testUser} addLike={mockHandler2} />,
  );

  const button = component.getByText('view');
  fireEvent.click(button);

  const likeButton = component.getByText('like');
  fireEvent.click(likeButton);
  fireEvent.click(likeButton);

  expect(mockHandler2.mock.calls).toHaveLength(2);
});
