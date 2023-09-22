import React, { useState } from "react";
import "../../styles/login.css";

export const HidePassword = () => {
  const [hidePassword, setHidePassword] = useState(true);
  const [eyeIcon, setEyeIcon] = useState("far fa-eye-slash");

  const passwordVisibility = () => {
    setHidePassword(!hidePassword);
    setEyeIcon(hidePassword ? "far fa-eye" : "far fa-eye-slash");
  };

  return (
    <div className="mb-3" style={{ position: "relative" }}>
      <label htmlFor="inputPassword" className="form-label">
        Contraseña
      </label>
      <input
        type={hidePassword ? "password" : "text"}
        className="form-control"
        name="password"
        id="inputPassword"
      />

      <i
        className={eyeIcon}
        id="togglePassword"
        onClick={passwordVisibility}
        style={{
          cursor: "pointer",
          position: "absolute",
          top: "75%",
          right: "10px",
          transform: "translateY(-50%)",
        }}></i>
    </div>
  );
};
