import React from 'react';
import "../../styles/headerSignupPage.css"
import ActionButtons from './actionButtons';

const HeaderSignupPage = () => {
    return (
        <div className="container-fluid text-center bg-signup-page d-flex">
            <div className="col-md-12 pt-5">
                <h1 className="display ">Obtén ingresos por cuidar mascotas</h1>
                <p className="lead">
                    Anúnciate en Puppy Tail, la red de dueños de mascotas más grande del mundo
                </p>
                <ActionButtons />
            </div>
        </div>
    );
};

export default HeaderSignupPage;
