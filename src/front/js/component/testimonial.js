
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

                        <p className="card-text">"This is a longer card with supporting text below as a natural lead-in to additional content"</p>

                    </div>
                    <div className="carousel-item text-center text-center m-0">
                        <h6 className="card-title mb-4">Anggie Alava</h6>

                        <p className="card-text">"This is a longer card with supporting text below as a natural lead-in to additional content"</p>

                    </div>
                    <div className="carousel-item text-center text-center m-0">
                        <h6 className="card-title mb-4">Martin Perez</h6>

                        <p className="card-text">"This is a longer card with supporting text below as a natural lead-in to additional content"</p>

                    </div>
                    <div className="carousel-item text-center text-center m-0">
                        <h6 className="card-title mb-4">Carmen Rocio</h6>

                        <p className="card-text">"This is a longer card with supporting text below as a natural lead-in to additional content"</p>

                    </div>
                    <div className="carousel-item text-center text-center m-0">
                        <h6 className="card-title mb-4">Luz Mantuano</h6>

                        <p className="card-text">"This is a longer card with supporting text below as a natural lead-in to additional content"</p>

                    </div>
                    <div className="carousel-item text-center text-center m-0">
                        <h6 className="card-title mb-4">Teresa Rodriguez</h6>

                        <p className="card-text">"This is a longer card with supporting text below as a natural lead-in to additional content"</p>

                    </div>
                    <div className="carousel-item text-center text-center m-0">
                        <h6 className="card-title mb-4">Juanpa</h6>

                        <p className="card-text">"This is a longer card with supporting text below as a natural lead-in to additional content"</p>

                    </div>
                    <div className="carousel-item text-center text-center m-0">
                        <h6 className="card-title mb-4">Lucia Lopez</h6>

                        <p className="card-text">"This is a longer card with supporting text below as a natural lead-in to additional content"</p>

                    </div>
                    <div className="carousel-item text-center text-center m-0">
                        <h6 className="card-title mb-4">Nicole Espinales</h6>
                        <p className="card-text">"This is a longer card with supporting text below as a natural lead-in to additional content"</p>
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
