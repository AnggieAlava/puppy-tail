import React from "react";
import "../../styles/featureServices.css"

const FeatureServices = () => {
    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6">
                    <div className="card mb-3 bg-transparent text-white list-card">
                        <div className="card-body">
                            <h5 className="card-title list-title text-center p-3">Tienes total flexibilidad</h5>
                            <p className="card-text list-text"><i className="fa-solid fa-check"></i>Establece tus propios horarios y tarifas</p>
                            <p className="card-text list-text"><i className="fa-solid fa-check"></i>ELige el tamaño, la edad y otras preferencias que tengas sobre las mascotas que quieres cuidar</p>
                            <p className="card-text list-text"><i className="fa-solid fa-check"></i>Ofrece cualquier combinación de servicios de cuidado de mascotas</p>
                        </div>
                        <img src="https://images.unsplash.com/photo-1555955924-a8c17aa846b2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" className="card-img-top list-img" alt="..." />
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="card mb-3 bg-transparent text-white list-card">
                        <div className="card-body">
                            <h5 className="card-title list-title text-center p-3">Te damos herramientas</h5>
                            <p className="card-text list-text"><i className="fa-solid fa-check"></i>Ofrecemos garantia de seguridad,permitimos un constante rastreo del estado de la mascota que estaras cuidando</p>
                            <p className="card-text list-text"><i className="fa-solid fa-check"></i>Gestiona tu calendario de cuidador y más con la app de Rover</p>
                            <p className="card-text list-text"><i className="fa-solid fa-check"></i>Tenemos un equipo de Seguridad y Calidad disponible para ayudarte</p>
                        </div>
                        <img src="https://images.unsplash.com/photo-1598681244895-1786022fe447?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" className="card-img-top list-img" alt="..." />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FeatureServices;
