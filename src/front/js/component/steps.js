import React from 'react';
import "../../styles/steps.css"
import PasoUno from "../../img/paso1.png"
import PasoDos from "../../img/paso2.png"
import PasoTres from "../../img/paso3.png"

const Steps = () => {
    return (
        <div className="container-fluid wrap-steps mt-5">
            <div className='container container-steps w-75'>
                <h2 className='text-center p-3 main-title-steps'>Encuentra el compañero perfecto para tu mascota en 3 simples pasos</h2>
                <div className="row justify-content-center">
                    <div className="col-md-3 col-sm-6">
                        <div className="card text-center mb-3 card-container">
                            <img
                                src={PasoUno}
                                alt="Paso 1"
                                className="card-img-top img-steps"
                            />
                            <div className="card-body card-steps-content align-items-end">
                                <h3 className="card-title card-steps-title">Buscar</h3>
                                <h4>Explora la comunidad</h4>
                                {/* <p className="card-text card-steps-text">
                                Crea tu cuenta gratuita, explora nuestra plataforma y redes sociales para descubrir a todos nuestros cuidadores.
                            </p> */}
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 col-sm-6">
                        <div className=" card text-center mb-3 card-container">
                            <img
                                src={PasoDos}
                                alt="Paso 2"
                                className="card-img-top img-steps"
                            />
                            <div className="card-body card-steps-content">
                                <h3 className="card-title card-steps-title">Seleccionar</h3>
                                <h4>Revisa los perfiles</h4>
                                {/* <p className="card-text card-steps-text">
                                Revisa el calendario de los cuidadores que han aplicado y elige un cuidador que sea ideal para ti y tus mascotas.
                            </p> */}
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 col-sm-6">
                        <div className="card text-center mb-3 card-container">
                            <img
                                src={PasoTres}
                                alt="Paso 4"
                                className="card-img-top img-steps"
                            />
                            <div className="card-body card-steps-content">
                                <h3 className="card-title card-steps-title">Reserva y paga</h3>
                                <h4>Hazlo oficial</h4>
                                {/* <p className="card-text card-steps-text">
                            No se necesita dinero en efectivo— facilitamos la reserva y los pagos seguros a través de nuestro sitio web o nuestra aplicación.
                            </p> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Steps;
