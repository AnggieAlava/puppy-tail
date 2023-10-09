import React from 'react';
import "../../styles/headerLanding.css"
import { Link } from "react-router-dom";

const HeaderLanding = () => {
  return (
    <div className="container-fluid p-0 d-flex align-items-center justify-content-center main-card">
      <div className="card card-header">
        <div className="card-body text-center">
          <h1 className="card-title landing-title"><span className='cuidamos-text'>Cuidamos</span> tus <span className="mascotas-text">mascotas</span> mientras estás de vacaciones</h1>
          {/* <p className="card-text landing-p">Encuentra personas cariñosas, verificadas y con reseñas para cuidar a tus miembros peludos de la familia mientras estás fuera de casa.</p> */}
        </div>
      </div>
      <Link to="/signup" className="btn-header-landing mt-5">Regístrate gratis</Link>
    </div>
  );
};

export default HeaderLanding;