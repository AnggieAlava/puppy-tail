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
    <div className="col-md-6">
      <div className="text-center wrap-login sm-2 text-sm">
        <h2 className="title-login">Iniciar sesión</h2>
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
            <HidePassword styleType="login" />
            <button type="submit"
              className="form-control"
              name="submit"
              id="btn-login">
              Iniciar sesión
            </button>
          </div>
          <p className="text-sm">Recupera tu contraseña<Link to="#">
            Aqui
          </Link></p>
          <h6 className="text-sm">No tienes una cuenta?<Link to="/signup" className="text-sm">Regístrate</Link></h6>
        </form>
      </div>
    </div>
  );
};
Login.propTypes = {
  match: PropTypes.object,
};
