import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import "../../styles/login.css";
import { HidePassword } from "../component/hidePassword";

export const Login = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

  async function login(e) {
    e.preventDefault();
    const data = new FormData(e.target);
    const email = data.get("email");
    const password = data.get("password");
    const { login } = actions;
    let resp = await login(email, password);
    if (resp === 201) {
      navigate("/home");
    }
  }

  return (
    <div className="text-center container">
      <div className="wrap-login">
        <i id="cat-suit-login" className="fa-solid fa-dog"></i>
        <h2></h2>
        <form className="pe-3" onSubmit={login}>
          <div className="mb-3">
            <label htmlFor="inputEmail" className="form-label">
              Correo electrónico
            </label>
            <input
              type="email"
              className="form-control"
              name="email"
              id="inputEmail"
              aria-describedby="emailHelp"
            />
            <div id="emailHelp" className="form-text"></div>
          </div>
          <HidePassword />
          <button id="btn-login" type="submit" className="btn">
            Iniciar sesión
          </button>
        </form>
      </div>
    </div>
  );
};
Login.propTypes = {
  match: PropTypes.object,
};
