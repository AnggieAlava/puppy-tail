import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/notFound.css";
const NotFound = () => {
    const navigate = useNavigate();

    const handleReturnHome = () => {
        navigate("/login"); // Redirige al home
    };

    return (
        <div className="not-found">
            <div className="error-flag">Error</div>
            <div className="content">
                <h1>404 - Not Found</h1>
                <p>La página que estás buscando no se encuentra.</p>
                <button onClick={handleReturnHome}>Volver al Inicio</button>
            </div>
        </div>
    );
};

export default NotFound;