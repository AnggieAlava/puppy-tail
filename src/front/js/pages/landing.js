import React, { useState, useEffect } from "react";
import "../../styles/landing.css";
import HeaderLanding from "../component/headerLanding";
import Reasons from "../component/reasons";
import OurServices from "../component/ourServices";
import Testimonial from "../component/testimonial";
import FooterLanding from "../component/footerLanding";

export const Landing = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <div className="landing">
      {loading ? (
        <div className="spinner-container">
          <div className="loader"></div>
        </div>
      ) : (

        <>
          <HeaderLanding />
          <OurServices />
          <Reasons />
          <Testimonial />
          <FooterLanding />
        </>
      )}
    </div>
  );
};