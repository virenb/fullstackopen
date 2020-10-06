import React from 'react';

const Notification = ({ message }) => {
  return (
    <div>
      {message !== null ? <div className='success'>{message}</div> : null}
    </div>
  );
};

export default Notification;
