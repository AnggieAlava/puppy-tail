import React from 'react';
import '../../styles/actionButtons.css';
import { RxDoubleArrowDown } from "react-icons/rx"

const ActionButtons = () => {
    return (
        <div className="container-fluid mt-5 d-flex justify-content-center">
            <a href="#footer" className='button btn-content'>
                <span className="button-text">Comenzar</span>
                <RxDoubleArrowDown className="iconer" />
            </a>
        </div>
    );
};

export default ActionButtons;
