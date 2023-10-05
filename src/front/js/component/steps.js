import React from 'react';
import "../../styles/description.css"

const Steps = () => {
    return (
        <section className="py-5 description-bg">
            <div className="container wrap-description">
                <h2 className='text-center p-3'>Encuentra el compañero perfecto para tu mascota en 4 simples pasos:</h2>
                <div className="row">
                    <div className="col-md-3">
                        <div className="text-center card-description ">
                            <img
                                src="https://images.unsplash.com/photo-1556155092-490a1ba16284?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW5zY3JpYmV0ZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"
                                alt="Paso 1"
                                className="card-img-top img-description"
                            />
                            <div className="card-body">
                                <h3 className="card-title">Paso 1 </h3>
                                <h4>Explora la comunidad</h4>
                                <p className="card-text">
                                    Crea tu cuenta gratuita, explora nuestra comunidad amante de las mascotas y, cuando estés listo, adquiere tu plan de membresía.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className=" text-center card-description">
                            <img
                                src="https://images.unsplash.com/photo-1516382799247-87df95d790b7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmV2aXNhfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60"
                                alt="Paso 2"
                                className="card-img-top img-description"
                            />
                            <div className="card-body">
                                <h3 className="card-title">Paso 2</h3>
                                <h4>Revisa los perfiles de los cuidadores</h4>
                                <p className="card-text">
                                    Lee las reseñas de otros padres de mascotas y decide quién es el mejor para tu familia peluda.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="text-center card-description">
                            <img
                                src="https://plus.unsplash.com/premium_photo-1682309667112-971fb0622b55?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZW52aWElMjBtZW5zYWplc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"
                                alt="Paso 3"
                                className="card-img-top img-description"
                            />
                            <div className="card-body">
                                <h3 className="card-title">Paso 3 </h3>
                                <h4>Revisa la disponibilidad</h4>
                                <p className="card-text">
                                    Revisa el calendario de los cuidadores que han aplicado, establece llamadas telefónicas y de video para asegurarte de que estén en la misma página.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="text-center card-description">
                            <img
                                src="https://plus.unsplash.com/premium_photo-1671028545792-f3a4c084f807?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8dmlzdG8lMjBidWVub3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"
                                alt="Paso 4"
                                className="card-img-top img-description"
                            />
                            <div className="card-body">
                                <h3 className="card-title">Paso 4</h3>
                                <h4>Hazlo oficial</h4>
                                <p className="card-text">
                                    Una vez que hayas econtrado el indicado, ambos deberán confirmar para asegurar la reserva.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Steps;
