import React from 'react';
import "../../styles/steps.css"
import PasoUno from "../../img/paso1.png"
import PasoDos from "../../img/paso2.png"
import PasoTres from "../../img/paso3.png"

const Steps = () => {
    return (
        <div className="container-fluid wrap-steps mt-5">
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
                            <h3 className="card-title card-steps-title">Paso 1 </h3>
                            <h4>Explora la comunidad</h4>
                            <p className="card-text card-steps-text">
                                Crea tu cuenta gratuita, explora nuestra comunidad amante de las mascotas y, cuando estés listo, reserva a tu cuidador favorito.
                            </p>
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
                            <h3 className="card-title card-steps-title">Paso 2</h3>
                            <h4>Revisa los perfiles</h4>
                            <p className="card-text card-steps-text">
                                Revisa el calendario de los cuidadores que han aplicado, establece llamadas telefónicas y de video para asegurarte de que estén en la misma página.
                            </p>
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
                            <h3 className="card-title card-steps-title">Paso 3</h3>
                            <h4>Hazlo oficial</h4>
                            <p className="card-text card-steps-text">
                                Una vez que hayas encontrado el indicado, ambos deberán confirmar para asegurar la reserva.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Steps;
