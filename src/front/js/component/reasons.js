import React from 'react';
import StepsLanding from "../component/stepsLanding"
import "../../styles/reasons.css"

const Reasons = () => {
    return (
    
            <div className="container-fluid reasons">
                <h3 className="text-center pt-5">¿Por qué elegir Puppy Tail?</h3>
                <div className="row mt-1 py-4">
                    <div className="col col-container ">
                        <h6 className="mt-3 text-center col-title"><i className="fa-solid fa-paw icons-reasons"></i>Bienestar de tu mascota</h6>
                    </div>
                    <div className="col col-container">
                        <h6 className="mt-3 text-center col-title"><i className="fa-solid fa-calendar icons-reasons"></i>Horario flexible</h6>

                    </div>
                    <div className="col col-container">
                        <h6 className="mt-3 text-center col-title"><i className="fa-solid fa-house icons-reasons"></i>Conveniencia</h6>

                    </div>
                    <div className="col col-container align-self-center">
                        <h6 className="mt-3 text-center col-title"><i className="fa-solid fa-shield-heart icons-reasons"></i>Confianza</h6>

                    </div>
                    <div className="col col-container">
                        <h6 className="mt-3 text-center col-title"><i className="fa-solid fa-star icons-reasons"></i>Experiencia</h6>
                    </div>
                </div>
                <StepsLanding/>
            </div>

    );
};

export default Reasons;
