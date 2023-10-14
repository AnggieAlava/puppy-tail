import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import { Context } from "../store/appContext";
import "../../styles/recovery.css"
import Swal from "sweetalert2";

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
    if (resp.code === 200) {
      Swal.fire({
        icon: "info",
        title: "Recuperar contraseña",
        text: "Mail enviado correctamente",
      });
    }

  }

  return (
    <>
    <div className="bottom-squiggle-wrapper container-fluid p-0"><img src="https://assets.website-files.com/64149f79022d0c5fc8ce46e8/64149f79022d0cc5c4ce4784_Bottom%20Squiggle.svg" loading="lazy" width="1792" height="128" alt="" className="bottom-squiggle" /></div>
    <div className="container-fluid recovery-page text-center pt-5">
    <div className="bg-recovery p-5">
      <form className=" pe-3" onSubmit={submitForm}>
      <h4>Recuperar contraseña</h4>
        <div className="mb-3 ">
          <label htmlFor="inputEmail" className="form-label">
            Correo electrónico
          </label>
          <input
            type="email"
            className="form-control mt-2 p-2"
            name="email"
            id="inputEmail"
            aria-describedby="emailHelp"
          />
          <div id="emailHelp" className="form-text"></div>
        </div>
        {error && <p className="text-danger">{error}</p>}
        <button type="submit" className="btn btn-recovery btn-orange">
          Recuperar contraseña
        </button>
      </form>
      </div>
    </div>
    </>
  );
};