import React from "react";
import "../../styles/footerSignupPage.css"
import SocialMedia from "../component/socialMedia"
import { Link } from "react-router-dom";


const FooterSignupPage = () => {
    return (
        <div className="container-fluid footer-signup text-center pt-5 mt-4">
            <p className="text-white">Siguenos en todas nuestras redes sociales y mantente al tanto de las novedades que la plataforma tiene para ofrecerte</p>
            <Link to="/login" ><button className="btn btn-success btn-footer-signup">Iniciar sesion</button></Link>
            <SocialMedia />
        </div>
    );
};

export default FooterSignupPage;
