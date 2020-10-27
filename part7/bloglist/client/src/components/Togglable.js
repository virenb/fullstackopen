import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Togglable = ({ children, buttonLabel }) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? 'none' : '' };
  const showWhenVisible = { display: visible ? '' : 'none' };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  return (
    <div>
    {buttonLabel === "new blog" ?
    <div style={hideWhenVisible}>
        <button onClick={toggleVisibility} type="button" id="newBlogButton">{buttonLabel}</button>
      </div>
      :
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility} type="button" id="loginButton">{buttonLabel}</button>
      </div>
    }
      <div style={showWhenVisible}>
        {children}
        <button onClick={toggleVisibility} id="cancelLoginButton" type="button">cancel</button>
      </div>
    </div>
  );
};

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};

export default Togglable;
