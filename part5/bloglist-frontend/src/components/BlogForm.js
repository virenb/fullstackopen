import React from 'react';

const BlogForm = ({ addBlog, handleBlogChange, newBlog }) => (
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

export default BlogForm;

/*
<div style={hideWhenVisible}>
          <button onClick={() => setBlogFormVisible(true)}>create blog</button>
        </div>
        <div style={showWhenVisible}>
          <BlogForm
            addBlog={addBlog}
            newBlog={newBlog}
            handleBlogChange={({ target }) => setNewBlog({[target.name]:target.value})}
          />
          <button onClick={() => setLoginVisible(false)}>cancel</button>
        </div>
*/
