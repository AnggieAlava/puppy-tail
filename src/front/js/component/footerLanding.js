import React from "react";
import "../../styles/footerLanding.css"
import SocialMedia from "../component/socialMedia"
import { Link } from "react-router-dom";


const FooterLanding = () => {
    return (
        <>
            <div className="top-squiggle-wrapper container-fluid p-0"><img src="https://assets.website-files.com/64149f79022d0c5fc8ce46e8/64149f79022d0c7976ce4795_Section%20Curve%2002.svg" loading="lazy" width="1792" height="80" alt="" className="top-squiggle" /></div>
            <div id="footer" className="container-fluid footer-landing text-center pt-5">
                <h5 className="text-black">Estamos aquí emocionados por recibirte,  <span className="ready-text">¿estás listo?</span></h5>
                <Link to="/signup" ><button className="btn btn-danger btn-footer-landing m-3">Registrarse</button></Link>
                <SocialMedia />
            </div>
        </>
    );
};

export default FooterLanding;
