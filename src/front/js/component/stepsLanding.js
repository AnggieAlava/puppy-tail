import React from 'react';
import "../../styles/stepsLanding.css"

const StepsLanding = () => {
    return (
            <div className='container wrap-steps-landing w-75'>
                <h2 className='text-center p-3 main-title'>¿Cómo funciona?</h2>
                <div className="row justify-content-center">
                    <div className="col-md-3 col-sm-6">
                        <div className="card text-center mb-3 card-container">
                            <div className="card-number">1</div>
                            <div className="card-body steps-content align-items-end">
                                <h5 className="steps-title">Crea tu perfil</h5>
                              
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 col-sm-6">
                        <div className=" card text-center mb-3 card-container">
                            <div className="card-number">2</div>
                            <div className="card-body steps-content">
                                <h5 className="steps-title">Establece horarios</h5>
                              
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 col-sm-6">
                        <div className="card text-center mb-3 card-container">
                            <div className="card-number">3</div>
                            <div className="card-body steps-content">
                                <h5 className="steps-title">Recibe pagos</h5>
                             
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    );
};

export default StepsLanding;
