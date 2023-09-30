import React, { useContext } from "react";
import "../../styles/landing.css";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import { Login } from "./login";
// import {Footer} from "./component/";

export const Landing = () => {
  const { store, actions } = useContext(Context);

  return (
    <div className="background">
      <section className="home">
        <div className='content'>
          <h1 className='logo'></h1>
          <h2 className="arc">Bienvenidos</h2>
          <h3>Puppy Tail</h3>
          <h4>No tienes una cuenta?<Link to="/signup">Registrate</Link></h4> 
          <div>
            <a className="icon" href="https://www.instagram.com/thepuppytail"
              target="_blank"><i className='fab fa-instagram' ></i></a>
            <a className="icon" href="https://twitter.com/thepuppytaill"
              target="_blank"><i className='fab fa-twitter' ></i></a>
            <a className="icon" href="https://www.tiktok.com/@thepuppytail"
              target="_blank"><i className='fab fa-tiktok' ></i></a>
          </div>
        </div>
        <Login />
      </section>
    </div>
  );
};
