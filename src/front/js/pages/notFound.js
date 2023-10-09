import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/notFound.css";
const NotFound = () => {
    const navigate = useNavigate();

    const handleReturnHome = () => {
        navigate("/login");
    };

    return (
        <div className="not-found">
            <div className="image-container">
                <img
                    src="https://th.bing.com/th/id/OIP.Gfzn0VbWObOFQilT1aCtSQHaFE?pid=ImgDet&w=883&h=605&rs=1"
                    alt="Error 404"
                    className="error-image"
                />
            </div>
            <div className="content">
                <h1>404 - Not Found</h1>
                <p>La página que estás buscando no se encuentra.</p>
                <button onClick={handleReturnHome}>Volver al Inicio</button>
            </div>
        </div>
    );
};

export default NotFound;