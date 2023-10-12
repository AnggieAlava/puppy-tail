import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/navbar.css";
import { Link } from "react-router-dom";
import { Logout } from "../pages/logout";

export const Navbar = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    // Llamar a la función loadTokens cuando el componente se monta
    actions.loadTokens();
  }, []);

  return (
    <nav className="navbar navbar-expand-lg py-3 px-5">
      <div className="container-fluid">
        <div className="navbar-logo">
          <Link to="/" className="logo">
            Puppy Tail
          </Link>
        </div>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerDemo02"
          aria-controls="navbarTogglerDemo02"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse toggler-nav"
          id="navbarTogglerDemo02"
        >
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 mx-2">
            <li className="nav-item">
              <a className="nav-link text-navbar" aria-current="page" href="/home">
                Inicio
              </a>
            </li>
            {Object.keys(store.userInfo).length > 0 ? (
              // El usuario está autenticado, mostrar opciones de usuario autenticado
              <>
                <li className="nav-item">
                  <Logout />
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link text-navbar"
                    to={"/profile/" + store.userInfo.user_type + "/" + store.userInfo.userId}
                  >
                    Perfil <i className="fa-regular fa-user"></i>
                  </Link>
                </li>
              </>
            ) : (
              // El usuario no está autenticado, mostrar opciones de inicio de sesión y registro
              <>
                <li className="nav-item">
                  <Link className="nav-link text-navbar" to="/login">
                    Iniciar sesión
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-navbar" to="/signup">
                    Registrarse
                  </Link>
                  <Link id="action-navbar"className="nav-link text-navbar" to="/signuppage">
                  Quieres ser cuidador?
                </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};
