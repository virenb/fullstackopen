import React, { useState } from 'react';

const Blog = ({ user, blog }) => {
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
            <button type="button">like</button>
          </div>
          <div>{user.name}</div>
        </>
      ) : <button type="button" onClick={() => displayMore()}>view</button>}

    </div>
  );
};

export default Blog;
