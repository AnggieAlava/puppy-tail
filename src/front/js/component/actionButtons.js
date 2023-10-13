import React from 'react';
import '../../styles/actionButtons.css';
import { RxDoubleArrowDown } from "react-icons/rx"

const ActionButtons = () => {
    return (
        <div className="container-fluid d-flex justify-content-center mt-5 ">
            <a href="#footer" className='button btn-content btn-action'>
                <span className="button-text">Comenzar</span>
                <RxDoubleArrowDown className="iconer" />
            </a>
        </div>
    );
};

export default ActionButtons;
