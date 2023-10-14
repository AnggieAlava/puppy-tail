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
                <ActionButtons />
            </div>
        </div>
        <div className="bottom-squiggle-wrapper container-fluid p-0"><img src="https://assets.website-files.com/64149f79022d0c5fc8ce46e8/64149f79022d0cc5c4ce4784_Bottom%20Squiggle.svg" loading="lazy" width="1792" height="128" alt="" className="bottom-squiggle" /></div>
        </>
    );
};

export default HeaderSignupPage;
