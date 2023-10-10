import React from "react";
import "../../styles/landing.css";
import Steps from "../component/steps";
import HeaderLanding from "../component/headerLanding";
import Reasons from "../component/reasons";
import ActionButtons from "../component/actionButtons";
import OurServices from "../component/ourServices"
import Testimonial from "../component/testimonial";
import FooterLanding from "../component/footerLanding";
import Blob  from "../component/blobs";

export const Landing = () => {

  return (
     <div className="landing"> 
     {/* <Blob/> */}
      <HeaderLanding />
      <OurServices />
      <ActionButtons />
      <Reasons />
      <Testimonial />
      <FooterLanding />
    </div>
  
  )
};
