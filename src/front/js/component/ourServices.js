import React, { useContext, useState }  from 'react';
import dogWalk from "../../img/dogWalk.png"
import dogShower from "../../img/shower.png"
import dogParty from "../../img/dogParty.png"
import "../../styles/ourServices.css"
const OurServices = () => {
    const [showModal, setShowModal] = useState(false);
    const [modalContent, setModalContent] = useState('');

    // Función para abrir el modal con el contenido deseado
    const openModal = (content) => {
        setModalContent(content);
        setShowModal(true);
    };

    // Función para cerrar el modal
    const closeModal = () => {
        setShowModal(false);
    };
    return (
        <div className="container">
            <h2 className="text-center">Nuestros servicios</h2>
            <div className="row gx-3">
                <div className="col d-flex justify-content-center" onClick={() => openModal('Detalles de como organizamos las fiestas')}>
                    <div className="card services-uno" style={{ width: '18rem' }}>
                        <div className="text-center">
                            {/* <img src={dogWalk} className="card-img-top img-services-land" alt="..." /> */}
                        </div>
                        <div className="card-body">
                            <h5 className="card-title text-center">Organizadores de fiesta</h5>
                            {/* <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> */}
                        </div>
                    </div>
                </div>
                <div className="col d-flex justify-content-center"onClick={() => openModal('Detalles de los paseos de perro')}>
                    <div className="card services-dos" style={{ width: '18rem' }}>
                        <div className="text-center">
                            {/* <img src={dogShower} className="card-img-top img-services-land" alt="..." /> */}
                        </div>
                        <div className="card-body">
                            <h5 className="card-title text-center">Paseo de perros</h5>
                            {/* <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> */}
                        </div>
                    </div>
                </div>
                <div className="col d-flex justify-content-center"onClick={() => openModal('Detalles de las visitas a domicilio')}>
                    <div className="card services-tres" style={{ width: '18rem' }}>
                        <div className="text-center">
                            {/* <img src={dogParty} className="card-img-top img-services-land" alt="..." /> */}
                        </div>
                        <div className="card-body">
                            <h5 className="card-title text-center">Visitas a domicilio</h5>
                            {/* <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> */}
                        </div>
                    </div>
                </div>
                <div className="col d-flex justify-content-center"onClick={() => openModal('Detalles de la Guardería de día')}>
                    <div className="card services-cuatro" style={{ width: '18rem' }}>
                        <div className="text-center">
                            {/* <img src={dogParty} className="card-img-top img-services-land" alt="..." /> */}
                        </div>
                        <div className="card-body">
                            <h5 className="card-title text-center">Guardería de día</h5>
                            {/* <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> */}
                        </div>
                    </div>
                </div>
            </div>
            {showModal && (
    <div className="modal show" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable" role="document">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">Detalles del Servicio</h5>
                    <button type="button" className="close" onClick={closeModal}>
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    <p>{modalContent}</p>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={closeModal}>
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
