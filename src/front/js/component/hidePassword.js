import React, { useState } from "react";
import "../../styles/signup.css";

export const HidePassword = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="mb-6">
      <label htmlFor="inputPassword" className="form-label">
        Contraseña
      </label>
      <div className="input-group mb-6 form-control p-0">
        <input
          type={showPassword ? "text" : "password"}
          className="form-control p-2"
          name="password"
          id="inputPassword"
        />
        <button
          type="button"
          className="btn"
          onClick={togglePasswordVisibility}
        >
          <i className={showPassword ? "fa-solid fa-eye" : "fa-solid fa-eye-slash"}></i>
        </button>
      </div>
    </div>
  );
};
