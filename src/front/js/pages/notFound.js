import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
    const navigate = useNavigate();

    const handleReturnHome = () => {
        navigate("/login"); // Redirige al home
    };

    return (
        <div>
            <h1>404 - Not Found</h1>
            <p>Error</p>
            <button onClick={handleReturnHome}>Volver al Inicio</button>
        </div>
    );
};

export default NotFound;