import React, { useContext } from "react";
import "../../styles/landing.css";
import { Context } from "../store/appContext";
import { Login } from "./login";
// import {Footer} from "./component/";

export const Landing = () => {
  const { store, actions } = useContext(Context);

  return (
    <div className="background">
      <section className="home">
          <div className='content'>
              <h1 className='logo'></h1>
              <h2>Bienvenidos</h2>
              <h3>A Puppy Tail</h3>
              <p>Estamos aqui para ayudarte <br/> todos nuestros servicios se <br/> personalizan y adaptan a tus necesidades</p>
              <div className="icon">
                <a href="https://www.instagram.com/thepuppytail"
                  target="_blank"><i className='fab fa-instagram' ></i></a>
                <a href="https://twitter.com/thepuppytaill"
                  target="_blank"><i className='fab fa-twitter' ></i></a>
                <a href="https://www.tiktok.com/@thepuppytail"
                  target="_blank"><i className='fab fa-tiktok' ></i></a>
              </div>
          </div>
          <Login />
      </section>
    </div>
  );
};
