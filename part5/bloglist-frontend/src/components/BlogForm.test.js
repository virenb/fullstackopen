import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import BlogForm from './BlogForm';

test('Blog form calls event handler as it receives props when a new blog is created', () => {
  const createBlog = jest.fn();

  const component = render(
    <BlogForm createBlog={createBlog} />,
  );

  const titleInput = component.container.querySelector('input[name="title"]');
  const authorInput = component.container.querySelector('input[name="author"]');
  const urlInput = component.container.querySelector('input[name="url"]');
  const form = component.container.querySelector('form');

  fireEvent.change(titleInput, {
    target: { value: 'Full Stack Open is great' },
  });
  fireEvent.change(authorInput, {
    target: { value: 'bob123' },
  });
  fireEvent.change(urlInput, {
    target: { value: 'fullstackopen.com' },
  });
  fireEvent.submit(form);

  expect(createBlog.mock.calls).toHaveLength(1);
  expect(createBlog.mock.calls[0][0].title).toBe('Full Stack Open is great');
  expect(createBlog.mock.calls[0][0].author).toBe('bob123');
  expect(createBlog.mock.calls[0][0].url).toBe('fullstackopen.com');
});
