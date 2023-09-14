import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  
  const logout = async () => {
  
  
      const { logout } = actions;
      console.log("Enviando solicitud de cierre de sesión...");
      const resp = await logout();
      
      console.log("Respuesta del servidor:", resp);

   ;

  useEffect(() => {
    // Verifica si hay un token de acceso en el localStorage
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      // No hay un token de acceso, redirige al usuario a la página de registro ("signup")
      navigate("/signup");
    }
  }, [])
};
  return (
    <div id="login-page" className="text-center">
      <div className="container wrap-loginSignup">
        <i id="cat-suit" className="fa-solid fa-cat"></i>
        <h2>Login</h2>
        <form className="pe-3" onSubmit={logout}>
          <button id="btn-login" type="submit" className="btn">
            Cerrar Sesión
          </button>
        </form>
      </div>
    </div>
  );
};