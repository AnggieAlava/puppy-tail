import React from 'react';
import "../../styles/headerSignupPage.css"
import ActionButtons from './actionButtons';

const HeaderSignupPage = () => {
    return (
        <>
            <div className="container-fluid text-center bg-signup-page d-flex">
            <div className="col-md-12 pt-5">
                
                <h1 className="display ">Obtén ingresos por cuidar mascotas</h1>
                <p className="lead">
                    Anúnciate en Puppy Tail, la red de dueños de mascotas más grande del mundo
                </p>
                <div className="img-header container-fluid p-0"><img src="https://img.freepik.com/vector-gratis/retratos-duenos-mascotas-gente-sostiene-abraza-perros-gatos-ilustracion-plana-vectorial-personajes-felices-mujeres-hombres-animales-domesticos-conjunto-avatares-duenos-mascotas_107791-11593.jpg?w=900&t=st=1697332134~exp=1697332734~hmac=8a0de014a3f814e7d3d5f5b797ee6736ebdd144e1fd8277a6e97caf14cb76459" loading="lazy" width="1792" height="128" alt="" className="bottom-squiggle custom-img" /></div>
                <ActionButtons />
            </div>
        </div>
        {/* <div className="bottom-squiggle-wrapper container-fluid p-0"><img src="https://assets.website-files.com/64149f79022d0c5fc8ce46e8/64149f79022d0cc5c4ce4784_Bottom%20Squiggle.svg" loading="lazy" width="1792" height="128" alt="" className="bottom-squiggle" /></div> */}
        </>
    );
};

export default HeaderSignupPage;
