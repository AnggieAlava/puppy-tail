import React from "react";
import "../../styles/footerSignupPage.css"
import SocialMedia from "../component/socialMedia"
import { Link } from "react-router-dom";


const FooterSignupPage = () => {
    return (
        <>
        <img src="https://assets.website-files.com/64149f79022d0c5fc8ce46e8/64149f79022d0c4a6dce47c6_Section%20Curve%2004.svg" loading="lazy" height="128" alt="" className="top-squiggle top-footer"/>
        <div className="container-fluid footer-signup text-center ">
            {/* <h6 className="text-white pt-3">Siguenos en todas nuestras redes sociales y mantente al tanto de las novedades que la plataforma tiene para ofrecerte</h6> */}
            <Link to="/login" ><button className="btn btn-orange btn-footer-signup">Iniciar sesion</button></Link>
            <SocialMedia />
        </div>
        </>
    );
};

export default FooterSignupPage;
