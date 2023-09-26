import React, { useContext, useState, useEffect } from "react";
import "../../styles/landing.css";
import { Context } from "../store/appContext";

let titles = [
  "Bienvenido a Puppy Tail",
  "Explora el mundo de Puppy Tail",
  "Amor en cada latido de cola",
  "Tu Compañero, nuestra pasión",
  "La cola que siempre está en alto",
];
let descriptions = [
  "Cuidado y alegría para mascotas, todo a la medida de tus necesidades",
  "Tu destino para mascotas felices",
  "Tu compañero, nuestra pasión",
  "Sabemos que tu peludo amigo es importante para ti, para nosotros tambien lo es",
  "La amistad y el cuidado, somo sun todo, tu, tu mascota y nuestra familia de Puppy Tail",
];

export const Landing = () => {
  const { store, actions } = useContext(Context);
  const [background, setBackground] = useState("background");
  const [title, setTitle] = useState(titles[0]);
  const [description, LandingsetDescription] = useState(descriptions[0]);

  const handleButtonClick = (index) => {
    setBackground(`background${index}`);
    setTitle(titles[index + 1]);
    setDescription(descriptions[index + 1]);
  };

  return (
    <div className={background} id="landing">
      <div className="landing-content">
        <div className="text-container">
          <h1 className="landing-title">{title}</h1>
          <h4 className="landing-description">{description}</h4>
        </div>
        <div className="buttons-container">
          <button
            className="btn-carrusel"
            onClick={() => handleButtonClick(1)}></button>
          <button
            className="btn-carrusel"
            onClick={() => handleButtonClick(2)}></button>
          <button
            className="btn-carrusel"
            onClick={() => handleButtonClick(3)}></button>
        </div>
      </div>
    </div>
  );
};
