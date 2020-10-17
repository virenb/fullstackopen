import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import BlogForm from './components/BlogForm';
import LoginForm from './components/LoginForm';
import Togglable from './components/Togglable';
import Notification from './components/Notification';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [notificationMessage, setNotificationMessage] = useState(null);
  const [errorOrSuccess, setErrorOrSuccess] = useState(null);
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

  const addBlog = (blogObject) => {
    blogService
      .create(blogObject)
      .then((returnedBlog) => {
        setBlogs(blogs.concat(returnedBlog));
        setErrorOrSuccess('success');
        setNotificationMessage(`a new blog ${returnedBlog.title} by ${returnedBlog.author} added`);
        setTimeout(() => {
          setNotificationMessage(null);
          setErrorOrSuccess('success');
        }, 5000);
      });
  };

  const addLike = (id, blogObject) => {
    blogService
      .update(id, blogObject)
      .then((returnedBlog) => {
        setBlogs(blogs.map((blog) => (blog.id !== returnedBlog.id ? blog : returnedBlog)));
      });
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
      setErrorOrSuccess('error');
      setNotificationMessage('wrong username or password');
      setTimeout(() => {
        setNotificationMessage(null);
        setErrorOrSuccess(null);
      }, 5000);
    }
  };

  const handleLogout = () => {
    window.localStorage.clear();
    setUser(null);
  };

  const loginForm = () => (
    <Togglable buttonLabel="login">
      <LoginForm
        username={username}
        password={password}
        handleLogin={handleLogin}
        setUsername={setUsername}
        setPassword={setPassword}
      />
    </Togglable>
  );

  const blogForm = () => (
    <Togglable buttonLabel="new blog">
      <BlogForm createBlog={addBlog} />
    </Togglable>
  );

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={notificationMessage} errorOrSuccess={errorOrSuccess} />

      {user === null
        ? loginForm()
        : (
          <div>
            {user.name}
            {' '}
            logged in
            {' '}
            <button type="submit" onClick={handleLogout}>logout</button>

            {' '}
            {blogForm()}
          </div>
        )}
      {user !== null
        ? blogs
          .sort((a, b) => (a.likes > b.likes ? -1 : 1))
          .map((blog) => <Blog key={blog.id} blog={blog} user={user} addLike={addLike} />)
        : null}
    </div>
  );
};

export default App;
