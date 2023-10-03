import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
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
    <div className="text-center wrap-login sm-2 text-sm">
      <h2 className="text-sm">Iniciar sesión</h2>
      <form className="" onSubmit={login}>
        <div className="mb-3 form-group">
          <label htmlFor="inputEmail " className="form-label">
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
        <HidePassword styleType="login" />

        <button id="btn-login" type="submit" className="btn text-sm">
          Iniciar sesión
        </button>
        <h6 className="text-sm">Te olvidaste tu contraseña? Haz click <Link to="#">
          Aqui
        </Link></h6>
      </form>
    </div>
  );
};
Login.propTypes = {
  match: PropTypes.object,
};
