import React from "react";

const Toast = ({ type, message }) => {
  return (
    <div className={`notification-container ${type}`}>
      <link rel="stylesheet" href="Toast.css" />
      <div className="notification toast">
        <button>X</button>
        <div className="notification-image">
          <img src="" alt="" />
        </div>
        <div>
          <p className="notification-message">{message}</p>
        </div>
      </div>
    </div>
  );
};

export default Toast;
