import React from "react";
import "../../styles/servicesSection.css"

const ServicesSection = () => {
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6">
                    <h2 className="text-center">Servicios</h2>
                    <ul className="list-group">
                        <li className="list-group-item list-services">Alojamiento de mascotas MAYORES INGRESOS</li>
                        <li className="list-group-item list-services">Cuida a un perro ¡o gato! durante la noche en tu casa. Los cuidadores que ofrecen alojamiento pueden cobrar hasta más del doble que los cuidadores que no lo ofrecen.</li>
                        <li className="list-group-item list-services">Paseo de perros</li>
                        <li className="list-group-item list-services">Elige paseos para perros que se ajusten a tu horario.</li>
                        <li className="list-group-item list-services">Guardería de día</li>
                        <li className="list-group-item list-services">Ideal para amantes de perros que trabajan desde casa.</li>
                        <li className="list-group-item list-services">Cuidado a domicilio, visitas a domicilio</li>
                        <li className="list-group-item list-services">Quédate con las mascotas en su entorno habitual o hazles una visita.</li>
                    </ul>
                </div>
                <div className="col-md-6">
                    <h2 className="text-center">Las herramientas para tener éxito</h2>
                    <ul className="list-group">
                        <li className="list-group-item list-services">La seguridad es lo primero. Siempre!</li>
                        <li className="list-group-item list-services">Trabajamos duro para asegurarnos de que los perros estén contentos y sus dueños estén completamente tranquilos.</li>
                        <li className="list-group-item list-services">Pagos en línea, seguros y cómodos</li>
                        <li className="list-group-item list-services">Cada cuidador de mascotas y paseador de perros realiza una verificación de identidad</li>
                        <li className="list-group-item list-services">Un equipo de soporte te cubre las espaldas</li>
                        <li className="list-group-item list-services">Formación continua para los cuidadores</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default ServicesSection;
