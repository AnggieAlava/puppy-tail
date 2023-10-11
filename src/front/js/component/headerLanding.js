
import React from 'react';
import "../../styles/headerLanding.css"
const HeaderLanding = () => {
    return (
        <header className="text-center py-4 card-header">
            <div className="container">
                <div className="row">
                    <div className="col-md-4 d-flex tex-center justify-content-center align-items-center">
                        <img
                            src="https://images.unsplash.com/photo-1632498301446-5f78baad40d0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDF8fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=500&q=80"
                            alt="Imagen de mascota"
                            className="img-fluid img-header-landing"
                        />
                    </div>
                    <div className="col-md-8 mt-5 header-box">
                    <h1 className="card-title landing-title">Cuidamos tus mascotas mientras estás de vacaciones</h1>
                        <p className="text-landind">
                            Encuentra personas cariñosas, verificadas y con reseñas para cuidar a tus miembros peludos de la familia mientras estás fuera de casa.
                        </p>
                        <a href="#signup-owner" className="btn btn-header-landing">
                            Crea tu cuenta gratuita
                        </a>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default HeaderLanding;