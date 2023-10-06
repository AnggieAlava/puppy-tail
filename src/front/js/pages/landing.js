import React, { useContext } from "react";
import "../../styles/landing.css";
import { Context } from "../store/appContext";
import Steps from "../component/steps";
import { Signup } from "./signup";
import CarouselTestimonial from "../component/carouselTestimonial";
import HeaderLanding from "../component/headerLanding";
import Reasons from "../component/reasons";
import ActionButtons from "../component/actionButtons";


export const Landing = () => {
  const { store, actions } = useContext(Context);

  return (
    <>
      <HeaderLanding />
      <Reasons />
      <ActionButtons />
      <Steps />
      <CarouselTestimonial />
      <Signup />
    </>
  )
};
