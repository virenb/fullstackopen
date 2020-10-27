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
    <div style={blogStyle} className="blogBody">
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
              class="likeBlogButton"
              onClick={() => addLike(blog.id, { ...blog, likes: blog.likes + 1 })}
            >
              like
            </button>
          </div>
          <div>{blog.user.name}</div>
          <div>{blog.user.username !== null ? (
            <button
              type="button"
              class="removeBlogButton"
              onClick={() => confirmRemove(blog)}
            >
              remove
            </button>
            )
            : null}
          </div>

        </>
      ) : <button type="button" class="viewMoreButton" name="view" onClick={() => displayMore()}>view</button>}

    </div>
  );
};

export default Blog;
