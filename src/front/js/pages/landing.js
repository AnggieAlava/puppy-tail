import React, { useContext } from "react";
import "../../styles/landing.css";
import { Context } from "../store/appContext";
import Steps from "../component/steps";
import { Signup } from "./signup";
import CarouselTestimonial from "../component/carouselTestimonial";
import HeaderLanding from "../component/headerLanding";


export const Landing = () => {
  const { store, actions } = useContext(Context);

  return (
    <>
      <HeaderLanding />
      <Steps />
      <Signup />
      <CarouselTestimonial />
    </>
  )
};
