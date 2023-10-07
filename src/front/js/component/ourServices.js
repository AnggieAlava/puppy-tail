import React from 'react';
import dogWalk from "../../img/dogWalk.png"
import dogShower from "../../img/shower.png"
import dogParty from "../../img/dogParty.png"
import "../../styles/ourServices.css"

const OurServices = () => {
    return (
        <div className="container">
            <h2 className="text-center">Nuestros servicios</h2>
            <div className="row gx-3">
                <div className="col d-flex justify-content-center">
                    <div className="card services-uno" style={{ width: '18rem' }}>
                        <div className="text-center">
                            <img src={dogWalk} className="card-img-top img-services-land" alt="..." />
                        </div>
                        <div className="card-body">
                            <h5 className="card-title">Cuidados en tu propio hogar</h5>
                            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        </div>
                    </div>
                </div>
                <div className="col d-flex justify-content-center">
                    <div className="card services-dos" style={{ width: '18rem' }}>
                        <div className="text-center">
                            <img src={dogShower} className="card-img-top img-services-land" alt="..." />
                        </div>
                        <div className="card-body">
                            <h5 className="card-title">Aseo y cuidados</h5>
                            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        </div>
                    </div>
                </div>
                <div className="col d-flex justify-content-center">
                    <div className="card services-tres" style={{ width: '18rem' }}>
                        <div className="text-center">
                            <img src={dogParty} className="card-img-top img-services-land" alt="..." />
                        </div>
                        <div className="card-body">
                            <h5 className="card-title">Organizador de fiestas</h5>
                            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        </div>
                    </div>
                </div>
                <div className="col d-flex justify-content-center">
                    <div className="card services-cuatro" style={{ width: '18rem' }}>
                        <div className="text-center">
                            <img src={dogParty} className="card-img-top img-services-land" alt="..." />
                        </div>
                        <div className="card-body">
                            <h5 className="card-title">Un cuarto servicio</h5>
                            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OurServices;
