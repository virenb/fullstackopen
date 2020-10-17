import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
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
