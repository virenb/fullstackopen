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
              id="likeBlogButton"
              onClick={() => addLike(blog.id, { ...blog, likes: blog.likes + 1 })}
            >
              like
            </button>
          </div>
          <div>{blog.user.name}</div>
          <div>{blog.user.username !== null ? (
            <button
              type="button"
              id="removeBlogButton"
              onClick={() => confirmRemove(blog)}
            >
              remove
            </button>
            )
            : null}
          </div>

        </>
      ) : <button type="button" id="viewMoreButton" onClick={() => displayMore()}>view</button>}

    </div>
  );
};

export default Blog;
