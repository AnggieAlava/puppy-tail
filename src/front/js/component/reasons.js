import React from 'react';
import "../../styles/reasons.css"

const Reasons = () => {
    return (
        <div className="container my-5">
            <h2 className="text-center">¿Por qué elegir Puppy Tail?</h2>
            <div className="row mt-4">
                <div className="col-sm-6 col-md-3 mb-4 col-container ">
                    <h4 className="mt-3 text-center col-title">Bienestar de tu mascota</h4>
                    <ul className='list-group'>
                        <li className='list-group-item list-reasons'>
                            <i className="suit-list fa fa-heart"></i> Tu mascota recibirá atención y cuidado personalizado.
                        </li>
                        <li className='list-group-item list-reasons'>
                            <i className="suit-list fa-solid fa-clock"></i> Los cuidadores pueden ajustar su horario según las necesidades de tu mascota.
                        </li>
                        <li className='list-group-item list-reasons'>
                            <i className="suit-list fa fa-home"></i> Tu mascota se sentirá más cómoda y segura en su propio entorno.
                        </li>
                    </ul>
                </div>
                <div className="col-sm-6 col-md-3 mb-4 col-container">
                    <h4 className="mt-3 text-center col-title">Horario flexible</h4>
                    <ul className='list-group'>
                        <li className='list-group-item list-reasons'>
                            <i className="suit-list fa-solid fa-clock"></i> Los cuidadores pueden ajustar su horario según tus necesidades.
                        </li>
                        <li className='list-group-item list-reasons'>
                            <i className="suit-list fa fa-map-marker"></i> No es necesario desplazarte; los cuidadores vienen a tu hogar.
                        </li>
                        <li className='list-group-item list-reasons'>
                            <i className="suit-list fa fa-comments"></i> Comunicación constante para mantenerte informado sobre tu mascota.
                        </li>
                    </ul>
                </div>
                <div className="col-sm-6 col-md-3 mb-4 col-container">
                    <h4 className="mt-3 text-center col-title">Conveniencia</h4>
                    <ul className='list-group'>
                        <li className='list-group-item list-reasons'>
                            <i className="suit-list fa fa-map-marker"></i> No es necesario desplazarte; los cuidadores vienen a tu hogar.
                        </li>
                        <li className='list-group-item list-reasons'>
                            <i className="suit-list fa fa-user"></i> Servicio personalizado según las necesidades de tu mascota.
                        </li>
                        <li className='list-group-item list-reasons'>
                            <i className="suit-list fa fa-trophy"></i> Experiencia y capacitación para el cuidado adecuado de mascotas.
                        </li>
                    </ul>
                </div>
                <div className="col-sm-6 col-md-3 mb-4 col-container">
                    <h4 className="mt-3 text-center col-title ">Confianza</h4>
                    <ul className='list-group'>
                        <li className='list-group-item list-reasons'>
                            <i className="suit-list fa fa-comments"></i> Comunicación constante para mantenerte informado sobre tu mascota.
                        </li>
                        <li className='list-group-item list-reasons'>
                            <i className="suit-list fa fa-user"></i> Servicio personalizado según las necesidades de tu mascota.
                        </li>
                        <li className='list-group-item list-reasons'>
                            <i className="suit-list fa fa-check-circle"></i> Cuidadores de mascotas calificados para garantizar la seguridad.
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Reasons;
