import React, { useState } from 'react';

const BlogForm = ({ createBlog }) => {
  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' });

  const handleBlogChange = (event) => {
    setNewBlog({ ...newBlog, [event.target.name]: event.target.value });
  };

  const addBlog = (event) => {
    event.preventDefault();
    createBlog({
      title: newBlog.title,
      author: newBlog.author,
      url: newBlog.url,
      likes: newBlog.likes || 0,
    });

    setNewBlog({ title: '', author: '', url: '' });
  };

  return (
    <form onSubmit={addBlog}>
      <label>
        title:
        {' '}
        <input
          type="text"
          value={newBlog.title}
          name="title"
          onChange={handleBlogChange}
        />
      </label>
      <br />
      <label>
        author:
        {' '}
        <input
          type="text"
          value={newBlog.author}
          name="author"
          onChange={handleBlogChange}
        />
      </label>
      <br />
      <label>
        url:
        {' '}
        <input
          type="text"
          value={newBlog.url}
          name="url"
          onChange={handleBlogChange}
        />
      </label>
      {' '}
      <br />
      <button type="submit">create</button>
      <br />
    </form>
  );
};

export default BlogForm;
