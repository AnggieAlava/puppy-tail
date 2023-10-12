import React, { useContext, useState } from 'react';
import dogWalk from "../../img/dogWalk.png"
import dogShower from "../../img/shower.png"
import dogParty from "../../img/dogParty.png"
import "../../styles/ourServices.css"
const OurServices = () => {
    const [showModal, setShowModal] = useState(false);
    const [modalContent, setModalContent] = useState('');

    const openModal = (content) => {
        setModalContent(content);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };
    return (
        <div className="container-fluid p-0 d-flex justify-content-center align-items-center services-wrap">
            <div className="linea"></div>
            <h2 className="text-center mt-2 services-title w-75">Nuestros servicios</h2>
            <div className="row w-75 pb-5">
                <div className="col d-flex justify-content-center mt-4 col-steps">
                    <div className="card services-uno" style={{ width: '18rem' }} onClick={() => openModal('Planificamos y decoramos eventos divertidos y seguros para celebrar cumpleaños, aniversarios u otras ocasiones especiales para tu peludo amigo')}>
                        <div className="text-center">

                        </div>
                        <div className="card-body p-0">
                            <h5 className="card-title text-center title-card-steps">Organizadores de fiesta</h5>
                        </div>
                    </div>
                </div>
                <div className="col d-flex justify-content-center mt-4 col-steps" >
                    <div className="card services-dos" style={{ width: '18rem' }} onClick={() => openModal('Nuestros paseadores capacitados garantizan que tu mascota obtenga la dosis adecuada de actividad física y exploración al aire libre, manteniéndola feliz y saludable')}>
                        <div className="text-center">

                        </div>
                        <div className="card-body p-0">
                            <h5 className="card-title text-center title-card-steps">Paseo de perros</h5>

                        </div>
                    </div>
                </div>
                <div className="col d-flex justify-content-center mt-4 col-steps" >
                    <div className="card services-tres" style={{ width: '18rem' }} onClick={() => openModal('Nuestros cuidadores de confianza atienden a tus mascotas en la comodidad de su entorno, asegurándose de que reciban comida, agua y cariño, además de supervisar su bienestar general')}>
                        <div className="text-center">

                        </div>
                        <div className="card-body p-0">
                            <h5 className="card-title text-center title-card-steps">Visitas a domicilio</h5>

                        </div>
                    </div>
                </div>
                <div className="col d-flex justify-content-center mt-4 col-steps" >
                    <div className="card services-cuatro" style={{ width: '18rem' }} onClick={() => openModal(' Cuando tienes que trabajar o estar fuera de casa durante el día, nuestra guardería ofrece un ambiente seguro y divertido para tu mascota')}>
                        <div className="text-center">

                        </div>
                        <div className="card-body p-0">
                            <h5 className="card-title text-center title-card-steps">Guardería de día</h5>

                        </div>
                    </div>
                </div>
            </div>
            <div className="bottom-squiggle-wrapper container-fluid p-0"><img src="https://assets.website-files.com/64149f79022d0c5fc8ce46e8/64149f79022d0cc5c4ce4784_Bottom%20Squiggle.svg" loading="lazy" width="1792" height="128" alt="" className="bottom-squiggle"/></div>
            {showModal && (
                <div className="modal show" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
                    <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Detalles del Servicio</h5>
                            </div>
                            <div className="modal-body">
                                <p>{modalContent}</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-danger" onClick={closeModal}>
                                    Cerrar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OurServices;
