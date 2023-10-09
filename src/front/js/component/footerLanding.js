import React from "react";
import "../../styles/footerLanding.css"
import SocialMedia from "../component/socialMedia"
import { Link } from "react-router-dom";


const FooterLanding = () => {
    return (
        <div id="footer" className="container-fluid footer-landing text-center pt-5 mt-4">
            <p className="text-white">Si quieres irte de vacaciones y necesitas que cuidemos tu mascota por ti, por favor completa el siguiente formulario</p>
            <Link to="/signup" ><button className="btn btn-danger btn-footer-landing">Registrarse</button></Link>
            <SocialMedia />
        </div>
    );
};

export default FooterLanding;
