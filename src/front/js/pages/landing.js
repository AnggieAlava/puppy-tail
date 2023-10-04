import React, { useContext } from "react";
import "../../styles/landing.css";
import { Context } from "../store/appContext";
import { Login } from "./login";
import CarruselServices from "../component/carruselServices";


export const Landing = () => {
  const { store, actions } = useContext(Context);

  return (
    <div className="background">
      <section className="home">
        <h2 className="arc d-none d-md-block">Bienvenidos</h2>
        <div className="container">
          <div className="row">
            <CarruselServices />
            <Login />
          </div>
        </div>
      </section>
    </div>
  );
};
