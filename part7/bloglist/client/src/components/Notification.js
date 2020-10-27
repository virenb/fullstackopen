import React from 'react';

const Notification = ({ message, errorOrSuccess }) => {
  if (message === null) {
    return null;
  }

  return (
    <div>
      {errorOrSuccess === 'success'
        ? <div className="success">{message}</div>
        : <div className="error">{message}</div>}
    </div>
  );
};

export default Notification;
