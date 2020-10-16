import React from 'react';

const LoginForm = ({
  username, password, handleLogin, setUsername, setPassword,
}) => (
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

export default LoginForm;
