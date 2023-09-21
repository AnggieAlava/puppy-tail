import React from "react";
import "../../styles/navbar.css";
import { Link } from "react-router-dom";
import { Logout } from "../pages/logout";

export const NavbarUser = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark">
      <div className="container-fluid">
        {/* <div className="navbar-logo">
          <a className="navbar-brand">
            <i className="fa-solid fa-paw "> Puppy Tail</i>
          </a>
        </div> */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerDemo02"
          aria-controls="navbarTogglerDemo02"
          aria-expanded="false"
          aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse toggler-nav"
          id="navbarTogglerDemo02">
          <ul className="navbar-nav ml-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/home">
                Home
              </a>
            </li>
            {/* <li className="nav-item">
              <Link className="nav-link" to="/login">
                Login
              </Link>
            </li> */}
            {/* <li className="nav-item">
              <Link className="nav-link" to="/signup">
                Signup
              </Link>
            </li> */}
            <Logout />
            {/* <li className="nav-item">
              <Link className="nav-link" to="/signup/keeper">
                Quieres ser cuidador?
              </Link>
            </li> */}
          </ul>
        </div>
      </div>
    </nav>
  );
};
