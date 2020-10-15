/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
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

  const blogForm = () => (
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
      <br />
      <button type="submit">create</button>
    </form>
  );

  const handleLogout = () => {
    window.localStorage.clear();
    setUser(null);
  };

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
              <button type="submit" onClick={handleLogout}>logout</button>
            </div>
            <br />
            <h2>create new</h2>
            {blogForm()}
            <div>
              {blogs.map((blog) => <Blog key={blog.id} blog={blog} />)}
            </div>
          </div>
        )}
    </div>
  );
};

export default App;
