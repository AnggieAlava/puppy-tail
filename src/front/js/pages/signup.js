import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { useNavigate, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/signup.css";
import locations from "../../json/location.json";
import { HidePassword } from "../component/hidePassword";

export const Signup = (props) => {
  const { store, actions } = useContext(Context);
  const params = useParams();
  const navigate = useNavigate();
  const [shouldNavigate, setShouldNavigate] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(" ");

  useEffect(() => {
    if (shouldNavigate) {
      navigate("/login");
    }
  }, [shouldNavigate]);

  async function signup(e) {
    e.preventDefault();
    const data = new FormData(e.target);
    const first_name = data.get("first_name");
    const last_name = data.get("last_name");
    const email = data.get("email");
    const location = selectedLocation;
    const password = data.get("password");
    const { signup } = actions;
    let resp = await signup(first_name, last_name, email, location, password);
    setShouldNavigate(true);
    console.log(resp);
  }

  return (
    <div id="signup-owner" className="text-center m-5">
      <div className="container wrap-signup">
        <h1>BIENVENIDOS</h1>
        <form className="pe-3" onSubmit={signup} id="form-signup">
          <div className="mb-6">
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
          <div className="mb-6">
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
          <div className="mb-6">
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
          <div className="mb-6">
            <label htmlFor="inputLocation" className="form-label">
              Pais
            </label>
            <select
              className="form-control"
              id="inputLocation"
              defaultValue="0"
              onChange={(e) => setSelectedLocation(e.target.value)}>
              <option className="option-country" value="0" disabled>
                Seleccione un pais
              </option>
              {locations.map((location, index) => {
                return (
                  <option
                    className="option-country"
                    value={location.es_name}
                    key={index}>
                    {location.es_name}
                  </option>
                );
              })}
            </select>
          </div>
          <HidePassword />
          <button id="btn-signup" type="submit" className="btn btn-danger">
            Registrarse
          </button>
        </form>
      </div>
    </div>
  );
};
Signup.propTypes = {
  match: PropTypes.object,
};
