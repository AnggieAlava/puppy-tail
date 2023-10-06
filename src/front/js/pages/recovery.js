import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import { Context } from "../store/appContext";

export const RecoveryPassword = () => {
  const { store, actions } = useContext(Context);
  const [error, setError] = useState(""); // Declaración de error

  async function submitForm(e) {
    e.preventDefault();
    let data = new FormData(e.target);
    let resp = await actions.requestPasswordRecovery(data.get("email"));
    if (resp.code === 400) {
      // El correo electrónico no existe, muestra un mensaje de error
      setError("El correo electrónico no existe en nuestra base de datos.");
    } else {
      setError(""); // Limpia el mensaje de error si la solicitud es exitosa
    }
    
  }

  return (
    <div id="login-page" className="text-center">
      <div className="container wrap-loginSignup">
        <i id="cat-suit" className="fa-solid fa-cat"></i>
        <h2></h2>
        <form className="pe-3" onSubmit={submitForm}>
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
          {error && <p className="text-danger">{error}</p>} {/* Muestra el mensaje de error si existe */}
          <button id="btn-login" type="submit" className="btn">
            Recuperar contraseña
          </button>
        </form>
      </div>
    </div>
  );
};