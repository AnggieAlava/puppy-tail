import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const Close = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

  const logout = async () => {
    const { logout } = actions;
    console.log("Enviando solicitud de cierre de sesión...");
    const resp = await logout();

    console.log("Respuesta del servidor:", resp);
  };
  let loggedIn = store.accessToken;
  if (!loggedIn) {
    return <div>Hello</div>;
  } else {
    return (
      <div id="login-page" className="text-center">
        <div className="container wrap-loginSignup">
          <i id="cat-suit" className="fa-solid fa-cat"></i>
          <h2>Cerrar sesion</h2>
          <form className="pe-3" onSubmit={logout}>
            <button id="btn-login" type="submit" className="btn">
              Cerrar Sesión
            </button>
          </form>
        </div>
      </div>
    );
  }
};
