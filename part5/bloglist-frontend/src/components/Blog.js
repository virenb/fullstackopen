/*
Make a test which checks that the component displaying a blog renders the blog's title and author, 
but does not render its url or number of likes by default
Add CSS-classes to the component to help the testing as necessary.
*/

import React, { useState } from 'react';

const Blog = ({
  user, blog, addLike, removePost,
}) => {
  const [displayInfo, setDisplayInfo] = useState(false);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  const displayMore = () => {
    setDisplayInfo(!displayInfo);
  };

  const confirmRemove = (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      removePost(blog.id);
    }
  };

  return (
    <div style={blogStyle}>
      {blog.title}
      {' '}
      {blog.author}

      {displayInfo ? (
        <>
          <button type="button" onClick={() => displayMore()}>hide</button>
          <div>{blog.url}</div>
          <div>
            likes
            {' '}
            {blog.likes}
            {' '}
            <button
              type="button"
              onClick={() => addLike(blog.id, { ...blog, likes: blog.likes + 1 })}
            >
              like
            </button>
          </div>
          <div>{blog.user.name}</div>
          {user.username === blog.user.username ? (
            <button
              type="button"
              onClick={() => confirmRemove(blog)}
            >
              remove
            </button>
          )
            : null}

        </>
      ) : <button type="button" onClick={() => displayMore()}>view</button>}

    </div>
  );
};

export default Blog;
