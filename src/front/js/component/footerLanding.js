import React from "react";
import "../../styles/footerLanding.css"
import SocialMedia from "../component/socialMedia"
import { Link } from "react-router-dom";


const FooterLanding = () => {
    return (
        <>
         <div className="top-squiggle-wrapper container-fluid p-0"><img src="https://assets.website-files.com/64149f79022d0c5fc8ce46e8/64149f79022d0c7976ce4795_Section%20Curve%2002.svg" loading="lazy" width="1792" height="80" alt="" className="top-squiggle"/></div>
            <div id="footer" className="container-fluid footer-landing text-center pt-5">
            <p className="text-white">Si quieres irte de vacaciones y necesitas que cuidemos tu mascota por ti, por favor completa el siguiente formulario</p>
            <Link to="/signup" ><button className="btn btn-danger btn-footer-landing">Registrarse</button></Link>
            <SocialMedia />
        </div>
        </>
    );
};

export default FooterLanding;
