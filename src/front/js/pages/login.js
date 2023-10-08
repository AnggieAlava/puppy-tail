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
  const [error, setError] = useState("");

  async function login(e) {
    e.preventDefault();
    const data = new FormData(e.target);
    const email = data.get("email");
    const password = data.get("password");
    const { login } = actions;
    let resp = await login(email, password);
    if (resp !== 201) {
      setError("Usuario o contraseña incorrecto");
      return;
    } else {
      setError(""); 
    }
    if (resp === 201) {
      navigate("/home");
    }
  }

  return (
      <div className="container-fluid wrap-login text-center">
          <form onSubmit={login} className="form-login">
          <h2 className="title-login">Iniciar sesión</h2>
            <div className="mb-3 form-group">
              <label htmlFor="inputEmail " className="form-label mt-3">
                Correo electrónico
              </label>
              <input
                type="email"
                className="form-control mt-2"
                name="email"
                id="inputEmail"
                aria-describedby="emailHelp"
              />
              <div id="emailHelp" className="form-text"></div>
              <HidePassword /> 
              <button type="submit"
                className="form-control btn-login mt-4"
                name="submit"
                id="btn-login">
                Iniciar sesión
              </button>
            </div>
            <div className="linea-decorativa text-center"></div>
            <Link to="/recovery" className="recovery-link">
            Olvidaste tu contraseña?
            </Link>
            <p className="mt-2 question">No tienes una cuenta?<Link to="/signup" className="click-signup"> Regístrate</Link></p>
            {error && <p className="text-danger">{error}</p>}
          </form>
        </div>
   

  );
};
Login.propTypes = {
  match: PropTypes.object,
};
