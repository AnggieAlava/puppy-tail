import React, { useContext } from "react";
import "../../styles/landing.css";
import { Context } from "../store/appContext";
import Steps from "../component/steps";
import HeaderLanding from "../component/headerLanding";
import Reasons from "../component/reasons";
import ActionButtons from "../component/actionButtons";
import OurServices from "../component/ourServices"
import Testimonial from "../component/testimonial";

export const Landing = () => {

  return (
    <>
      <HeaderLanding />
      <Reasons />
      <OurServices />
      <ActionButtons />
      <Steps />
      <Testimonial />
    </>
  )
};
