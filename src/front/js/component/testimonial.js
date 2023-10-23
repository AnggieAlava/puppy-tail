
import React from "react";
import "../../styles/testimonial.css";

const Testimonial = () => {
    return (
        <div className="container-fluid w-75 carousel-container my-5">
            <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
                <h5 className="text-center pt-5 quote-carousel"><i className="fa-solid fa-quote-left"></i> En los ojos de una mascota, encuentras la pureza del amor; <br />en su compañía, la tranquilidad del alma </h5>
                <div className="carousel-inner d-flex align-items-center justify-content-center carousel-test">
                    <div className="carousel-item active text-center m-0">
                        <h6 className="card-title mb-4">Carol Martinez</h6>

                        <p className="card-text p-5">"Puppy Tail ha sido un cambio de juego para mí y mi querido perrito. Nunca antes había sido tan fácil llevar un registro de sus necesidades y actividades diarias. ¡Gracias a esta aplicación, ahora disfrutamos de una relación más fuerte y saludable!"</p>

                    </div>
                    <div className="carousel-item text-center text-center m-0">
                        <h6 className="card-title mb-4">Anggie Alava</h6>

                        <p className="card-text p-5">"¡Puppy Tail es como tener un asistente personal para mi gato! Puedo programar recordatorios de comidas y visitas al veterinario, y recibir consejos útiles sobre el cuidado de mascotas. ¡No podría imaginar la vida sin esta aplicación!"</p>

                    </div>
                    <div className="carousel-item text-center text-center m-0">
                        <h6 className="card-title mb-4">Martin Perez</h6>

                        <p className="card-text p-5">"Como dueño de varios perros, Puppy Tail ha sido una bendición. Puedo gestionar fácilmente las necesidades individuales de mis perros y rastrear su salud y felicidad. Estoy muy agradecido por esta herramienta."</p>

                    </div>
                    <div className="carousel-item text-center text-center m-0">
                        <h6 className="card-title mb-4">Carmen Rocio</h6>

                        <p className="card-text p-5">"Puppy Tail me ha ayudado a descubrir nuevas formas de enriquecer la vida de mi conejillo de indias. Gracias a sus consejos personalizados, mi mascota está más activa y feliz que nunca."</p>

                    </div>
                    <div className="carousel-item text-center text-center m-0">
                        <h6 className="card-title mb-4">Luz Mantuano</h6>

                        <p className="card-text p-5">"La aplicación Puppy Tail es perfecta para cualquier amante de las mascotas. Me ayuda a mantener a mi loro sano y entretenido. Además, la interfaz es muy fácil de usar, ¡lo recomiendo a todos!"</p>

                    </div>
                    <div className="carousel-item text-center text-center m-0">
                        <h6 className="card-title mb-4">Teresa Rodriguez</h6>

                        <p className="card-text p-5">"Puppy Tail me ha permitido estar más en sintonía con las necesidades de mi perro. Puedo seguir su progreso y recibir consejos útiles para su entrenamiento. ¡Una aplicación esencial para cualquier dueño de mascotas!"</p>

                    </div>
                    <div className="carousel-item text-center text-center m-0">
                        <h6 className="card-title mb-4">Juanpa</h6>

                        <p className="card-text p-5">"Como amante de los gatos, Puppy Tail ha mejorado significativamente la calidad de vida de mi gato y la mía. Los recordatorios de alimentación y la capacidad de compartir fotos y notas con mi veterinario hacen que esta aplicación sea inestimable."</p>

                    </div>
                    <div className="carousel-item text-center text-center m-0">
                        <h6 className="card-title mb-4">Lucia Lopez</h6>

                        <p className="card-text p-5">"Puppy Tail ha hecho que cuidar de mi tortuga sea más fácil y divertido. Me encanta la función de seguimiento de hábitos y la posibilidad de conectarme con otros dueños de tortugas. ¡Una aplicación increíble!"</p>

                    </div>
                    <div className="carousel-item text-center text-center m-0">
                        <h6 className="card-title mb-4">Nicole Espinales</h6>
                        <p className="card-text p-5">"Puppy Tail es una aplicación excepcional para el cuidado de mascotas. He utilizado muchas aplicaciones similares, pero esta se destaca por su facilidad de uso y características útiles. ¡Mi perro y yo estamos más felices gracias a ella!"</p>
                    </div>
                </div>
                <div className="carousel-button-container d-none d-xl-block">
                    <button className="btn-prev-next">
                        <i className="fa-solid fa-arrow-left arrow-left" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev"></i>
                        <span style={{ margin: '0 10px' }}></span>
                        <i className="fa-solid fa-arrow-right arrow-right" data-bs-target="#carouselExampleIndicators" data-bs-slide="next"></i>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Testimonial;
