import React from "react";

function PasswordEye({ showPassword, setShowPassword }) {
  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <button className="eye" type="button" onClick={togglePasswordVisibility}>
      {showPassword ? (
        <i className="fa-solid fa-eye-slash"></i>
      ) : (
        <i className="fa-solid fa-eye"></i>
      )}
    </button>
  );
}

export default PasswordEye;
