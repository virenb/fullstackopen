import React from 'react';

const Notification = ({ message, error }) => {
  return (
    <div>
      {error && message == null ? (
        <div className='success'>{message}</div>
      ) : null}
      {error ? <div className='error'>{message}</div> : null}
      {!error && message ? <div className='success'>{message}</div> : null}
    </div>
  );
};

export default Notification;
