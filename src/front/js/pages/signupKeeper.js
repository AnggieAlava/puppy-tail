import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/login.css";
import { HidePassword } from "../component/hidePassword";
import { FilterLocation } from "../component/filterLocation";

export const SignupKeeper = (props) => {
  const { store, actions } = useContext(Context);
  const params = useParams();
  const navigate = useNavigate();
  const [shouldNavigate, setShouldNavigate] = useState(false);

  useEffect(() => {
    if (shouldNavigate) {
      navigate("/login");
    }
  }, [shouldNavigate]);

  async function signupKeeper(e) {
    e.preventDefault();
    const data = new FormData(e.target);
    const first_name = data.get("first_name");
    const last_name = data.get("last_name");
    const email = data.get("email");
    const location = data.get("location");
    const password = data.get("password");
    const { signupKeeper } = actions;
    let resp = await signupKeeper(
      first_name,
      last_name,
      email,
      location,
      password
    );
    setShouldNavigate(true);
    console.log(resp);
  }
  return (
    <div id="signup-page" className="text-center">
      <div className="container wrap-loginSignup">
        <i id="cat-suit" className="fa-solid fa-cat"></i>
        <h1>BIENVENIDO CUIDADOR</h1>
        <form className="pe-3" onSubmit={signupKeeper}>
          <div className="mb-3">
            <label htmlFor="inputName" className="form-label">
              Nombre
            </label>
            <input
              type="text"
              className="form-control"
              name="first_name"
              id="inputName"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="inputLastName" className="form-label">
              Apellido
            </label>
            <input
              type="text"
              className="form-control"
              name="last_name"
              id="inputLastName"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="inputEmail1" className="form-label">
              Correo electrónico
            </label>
            <input
              type="email"
              className="form-control"
              name="email"
              id="inputEmail1"
              aria-describedby="emailHelp"
            />
            <div id="emailHelp" className="form-text"></div>
          </div>
          <FilterLocation />
          <HidePassword />
          <button id="btn-signup" type="submit" className="btn">
            Registrarse
          </button>
        </form>
      </div>
    </div>
  );
};
SignupKeeper.propTypes = {
  match: PropTypes.object,
};
