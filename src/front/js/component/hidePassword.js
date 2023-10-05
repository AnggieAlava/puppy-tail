import React, { useState } from "react";
import "../../styles/signup.css";

export const HidePassword = ({ styleType }) => {
  const [hidePassword, setHidePassword] = useState(true);
  const [eyeIcon, setEyeIcon] = useState("far fa-eye-slash");

  const passwordVisibility = () => {
    setHidePassword(!hidePassword);
    setEyeIcon(hidePassword ? "far fa-eye" : "far fa-eye-slash");
  };

  const inputId = styleType === "login" ? "inputPasswordLogin" : "inputPasswordSignup";

  return (
    <div className="mb-3" style={{ position: "relative" }}>
      <label htmlFor={inputId} className="form-label">
        Contraseña
      </label>
      <input
        type={hidePassword ? "password" : "text"}
        className="form-control"
        name="password"
        id={inputId}
      />

      <i
        className={eyeIcon}
        id="togglePassword"
        onClick={passwordVisibility}
        style={{
          fontSize: 15,
          cursor: "pointer",
          position: "absolute",
          top: "75%",
          right: "10px",
          transform: "translateY(-50%)",
        }}
      ></i>
    </div>
  );
};
