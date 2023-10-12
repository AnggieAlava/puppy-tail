import React from 'react';
import "../../styles/reasons.css"

const Reasons = () => {
    return (
        <div className='container-fluid wrap-reasons p-4 mt-5 mb-5 w-75'>
            <div className="container reasons">
                <h2 className="text-center pt-5">¿Por qué elegir Puppy Tail?</h2>
                <div className="row mt-1 py-4">
                    <div className="col col-container ">
                        <h4 className="mt-3 text-center col-title"><i className="fa-solid fa-paw icons-reasons"></i>Bienestar de tu mascota</h4>
                    </div>
                    <div className="col col-container">
                        <h4 className="mt-3 text-center col-title"><i className="fa-solid fa-calendar icons-reasons"></i>Horario flexible</h4>

                    </div>
                    <div className="col col-container">
                        <h4 className="mt-3 text-center col-title"><i className="fa-solid fa-house icons-reasons"></i>Conveniencia</h4>

                    </div>
                    <div className="col col-container align-self-center">
                        <h4 className="mt-3 text-center col-title"><i className="fa-solid fa-shield-heart icons-reasons"></i>Confianza</h4>

                    </div>
                    <div className="col col-container">
                        <h4 className="mt-3 text-center col-title"><i className="fa-solid fa-star icons-reasons"></i>Experiencia</h4>

                    </div>
                </div>
            </div>

        </div>
    );
};

export default Reasons;
