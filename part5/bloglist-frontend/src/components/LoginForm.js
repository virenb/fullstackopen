import React from 'react';
import PropTypes from 'prop-types';

const LoginForm = ({
  username, password, handleLogin, setUsername, setPassword,
}) => (
  <form onSubmit={handleLogin}>
    <div>
      username
      {' '}
      <input
        id="username"
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
        id="password"
        type="password"
        value={password}
        name="password"
        onChange={({ target }) => setPassword(target.value)}
      />
    </div>
    <button id="loginFormButton" type="submit">login</button>
  </form>
);

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  setUsername: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}

export default LoginForm;
