import React from "react";

const ServicesSection = () => {
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6">
                    <h2>Servicios</h2>
                    <ul className="list-group">
                        <li className="list-group-item">Alojamiento de mascotas MAYORES INGRESOS</li>
                        <li className="list-group-item">Cuida a un perro (¡o gato!) durante la noche en tu casa. Los cuidadores que ofrecen alojamiento pueden cobrar hasta más del doble que los cuidadores que no lo ofrecen.</li>
                        <li className="list-group-item">Paseo de perros</li>
                        <li className="list-group-item">Elige paseos para perros que se ajusten a tu horario.</li>
                        <li className="list-group-item">Guardería de día</li>
                        <li className="list-group-item">Ideal para amantes de perros que trabajan desde casa.</li>
                        <li className="list-group-item">Cuidado a domicilio, visitas a domicilio</li>
                        <li className="list-group-item">Quédate con las mascotas en su entorno habitual o hazles una visita.</li>
                    </ul>
                </div>
                <div className="col-md-6">
                    <h2>Otros Servicios</h2>
                    <ul className="list-group">
                        <li className="list-group-item">La seguridad es lo primero. Siempre.</li>
                        <li className="list-group-item">Trabajamos duro para asegurarnos de que los perros estén contentos y sus dueños estén completamente tranquilos.</li>
                        <li className="list-group-item">Cada servicio Rover que ofreces incluye la Garantía Rover</li>
                        <li className="list-group-item">Pagos en línea, seguros y cómodos</li>
                        <li className="list-group-item">Cada cuidador de mascotas y paseador de perros realiza una verificación de identidad</li>
                        <li className="list-group-item">Un equipo de soporte te cubre las espaldas</li>
                        <li className="list-group-item">Formación continua para los cuidadores</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default ServicesSection;
