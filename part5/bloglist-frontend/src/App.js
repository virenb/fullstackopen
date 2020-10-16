/* eslint-disable react/button-has-type */
import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import BlogForm from './components/BlogForm';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' });
  const [showAll, setShowAll] = useState(true);
  const [message, setMessage] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [blogFormVisible, setBlogFormVisible] = useState(false);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const addBlog = (event) => {
    event.preventDefault();
    const blogObject = {
      title: newBlog.title,
      author: newBlog.author,
      url: newBlog.url,
    };

    blogService
      .create(blogObject)
      .then((returnedBlog) => {
        setBlogs(blogs.concat(returnedBlog));
        setMessage(`a new blog ${returnedBlog.title} by ${returnedBlog.author} added`);
        setTimeout(() => {
          setMessage(null);
        }, 5000);
        setNewBlog({ title: '', author: '', url: '' });
      });

    setBlogFormVisible(false);
  };

  const handleBlogChange = (event) => {
    setNewBlog({ ...newBlog, [event.target.name]: event.target.value });
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user),
      );
      blogService.setToken(user.token);
      setUser(user);
      setUsername('');
      setPassword('');
    } catch (exception) {
      setMessage('wrong username or password');
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  };

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        {' '}
        <input
          type="text"
          value={username}
          name="username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        {' '}
        <input
          type="password"
          value={password}
          name="password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  );

  const handleLogout = () => {
    window.localStorage.clear();
    setUser(null);
  };

  const hideWhenVisible = { display: blogFormVisible ? 'none' : '' };
  const showWhenVisible = { display: blogFormVisible ? '' : 'none' };

  return (
    <div>
      {user === null
        ? (
          <div>
            <h2>log in to application</h2>
            {message !== null ? (
              <div style={{
                color: 'red',
                background: 'lightgrey',
                fontSize: '20px',
                borderStyle: 'solid',
                borderRadius: '5px',
                padding: '10px',
                marginBottom: '10px',
              }}
              >
                {message}
              </div>
            )
              : null}
            {loginForm()}
          </div>
        )
        : (
          <div>
            <h2>blogs</h2>
            {message !== null ? (
              <div style={{
                color: 'green',
                background: 'lightgrey',
                fontSize: '20px',
                borderStyle: 'solid',
                borderRadius: '5px',
                padding: '10px',
                marginBottom: '10px',
              }}
              >
                {message}
              </div>
            )
              : null}
            <div>
              {user.name}
              {' '}
              logged in
              {' '}
              <button type="submit" onClick={handleLogout}>logout</button>
            </div>
            <br />
            <div style={hideWhenVisible}>
              <button onClick={() => setBlogFormVisible(true)}>new blog</button>
            </div>
            <div style={showWhenVisible}>
              <BlogForm
                addBlog={addBlog}
                newBlog={newBlog}
                handleBlogChange={handleBlogChange}
              />

              <button onClick={() => setBlogFormVisible(false)}>cancel</button>
            </div>
            <br />
            <div>
              {blogs.map((blog) => <Blog key={blog.id} blog={blog} />)}
            </div>
          </div>
        )}
    </div>
  );
};

export default App;
