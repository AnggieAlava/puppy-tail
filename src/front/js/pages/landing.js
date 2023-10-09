import React from "react";
import "../../styles/landing.css";
import Steps from "../component/steps";
import HeaderLanding from "../component/headerLanding";
import Reasons from "../component/reasons";
import ActionButtons from "../component/actionButtons";
import OurServices from "../component/ourServices"
import Testimonial from "../component/testimonial";
import FooterLanding from "../component/footerLanding";

export const Landing = () => {

  return (
    <div className="landing">
      <HeaderLanding />
      <OurServices />
      <ActionButtons />
      <Reasons />
      {/* <Steps /> */}
      <Testimonial />
      <FooterLanding />
    </div>
  )
};
