import React from 'react';
import "../../styles/steps.css"

const Steps = () => {
    return (
        <div className="container-fluid wrap-steps mt-5">
            <div className='container container-steps w-75'>
                <h2 className='text-center p-3 main-title-steps'>Como funciona</h2>
                <div className="row justify-content-center">
                    <div className="col-md-3 col-sm-6">
                        <div className="card text-center mb-3 card-container">
                            <div className="card-number text-center">1</div>
                            <div className="card-body card-steps-content align-items-end">
                                <h3 className="card-title card-steps-title">Buscar</h3>
                                <h4>Explora la comunidad</h4>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 col-sm-6">
                        <div className=" card text-center mb-3 card-container">
                            <div className="card-number">2</div>
                            <div className="card-body card-steps-content">
                                <h3 className="card-title card-steps-title">Seleccionar</h3>
                                <h4>Revisa los perfiles</h4>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 col-sm-6">
                        <div className="card text-center mb-3 card-container">
                            <div className="card-number">3</div>
                            <div className="card-body card-steps-content">
                                <h3 className="card-title card-steps-title">Reserva y paga</h3>
                                <h4>Hazlo oficial</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Steps;
