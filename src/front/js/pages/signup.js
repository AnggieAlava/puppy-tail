import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { useNavigate, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/signup.css";
import { Link } from "react-router-dom";
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
    <>
   <div className="bottom-squiggle-wrapper container-fluid p-0"><img src="https://assets.website-files.com/64149f79022d0c5fc8ce46e8/64149f79022d0cc5c4ce4784_Bottom%20Squiggle.svg" loading="lazy" width="1792" height="128" alt="" className="bottom-squiggle" /></div>
    <div className="container-fluid wrap-signup text-center">
     <div className="bg-signup p-5">
        <h1 className="title-signup">Registrate en Puppy Tail</h1>
      <form onSubmit={signup} className="form-signup pe-3">
        <div className="mb-3 form-group">
          <label htmlFor="inputName" className="form-label mt-2">
            Nombre
          </label>
          <input
            type="text"
            className="form-control p-2"
            name="first_name"
            id="inputName"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="inputLastName" className="form-label mt-2">
            Apellido
          </label>
          <input
            type="text"
            className="form-control p-2"
            name="last_name"
            id="inputLastName"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="inputEmail1" className="form-label mt-2">
            Correo electrónico
          </label>
          <input
            type="email"
            className="form-control p-2"
            name="email"
            id="inputEmail1"
            aria-describedby="emailHelp"
          />
          <div id="emailHelp" className="form-text"></div>
        </div>
        <div className="mb-6">
          <label htmlFor="inputLocation" className="form-label mt-2">
            Pais
          </label>
          <select
            className="form-control p-2"
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
        <label htmlFor="inputPassword" className="form-label">
        Contraseña
      </label>
        <HidePassword />
        <button id="btn-signup" type="submit" className="form-control btn-green mt-4">
          Registrarse
        </button>
        <p className="mt-4 question-signup">Ya tienes cuenta?<Link to="/login" className="click-login"> Ingresa aqui</Link></p>
      </form>
     </div>
    </div>
    </>
  );
};
Signup.propTypes = {
  match: PropTypes.object,
};
