import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/carruselServices.css";
import { Footer } from "./footer";

const CarruselServices = () => {
    const { store, actions } = useContext(Context);

    return (
        <div className="col-md-6">
            <h5 className="text-sm text-center pb-1 d-none d-md-block">Puppy Tail</h5>
            <div id="carouselExampleCaptions" className="carousel slide d-none d-md-block">
                <div className="carousel-inner text-center">
                    <div className="carousel-item active">
                        <div className="img-container">
                            <img src="https://images.unsplash.com/photo-1611601303737-6496949997cc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80" className="w-100 img-carrusel" alt="..." />
                            <div className="carousel-caption d-none d-md-block">
                                <h5 className="text-center carrusel-text">Paseo y Ejercicio</h5>
                            </div>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <div className="img-container">
                            <img src="https://plus.unsplash.com/premium_photo-1661270417408-bbf8a6b51a7d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80" className="w-100 img-carrusel" alt="..." />
                            <div className="carousel-caption d-none d-md-block">

                                <h5 className="text-center carrusel-text">Baño y Aseo</h5>
                            </div>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <div className="img-container">
                            <img src="https://images.unsplash.com/photo-1575149860301-fda8def1956f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1315&q=80" className="w-100 img-carrusel" alt="..." />
                            <div className="carousel-caption d-none d-md-block">
                                <h5 className="text-center carrusel-text">Cuidados en su Hogar</h5>
                            </div>
                        </div>
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
            <Footer />
        </div>
    );

};

export default CarruselServices;
