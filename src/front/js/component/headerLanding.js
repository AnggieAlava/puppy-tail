import React from 'react';
import "../../styles/headerLanding.css"
const HeaderLanding = () => {
    return (
        <div className="container-fluid p-1 header-background">
            <div className="card mb-3 main-card" >
                <div className="row g-0">
                    <div className="col-md-7 d-flex align-items-center justify-content-center">
                        <img src="https://images.unsplash.com/photo-1592951117908-4acda89ee817?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" className="img-fluid landing-img" alt="..." />
                    </div>
                    <div className="col-md-5 d-flex align-items-center ">
                        <div className="card-body ">
                            <h1 className="card-title landing-title text-center">Cuidamos tus mascotas mientras estás de vacaciones</h1>
                            <p className="card-text text-center landing-p ">Encuentra personas cariñosas, verificadas y con reseñas para cuidar a tus miembros peludos de la familia mientras estás fuera de casa.</p>
                            <a href="#footer" className="btn-header-landing ">Registrate gratis</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeaderLanding;