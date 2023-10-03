import React, { useContext } from "react";
import "../../styles/landing.css";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import { Login } from "./login";

export const Landing = () => {
  const { store, actions } = useContext(Context);

  return (
    <div className="background">
      <section className="home">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className="content d-none d-md-block">
                <h2 className="arc">Bienvenidos</h2>
                <h5 className="text-sm">Puppy Tail</h5>
                <h6 className="text-sm">No tienes una cuenta?<Link to="/signup" className="text-sm">Regístrate</Link></h6>
                <div>
                  <a className="icon" href="https://www.instagram.com/thepuppytail"
                    target="_blank"><i className='fab fa-instagram' ></i></a>
                  <a className="icon" href="https://twitter.com/thepuppytaill"
                    target="_blank"><i className='fab fa-twitter' ></i></a>
                  <a className="icon" href="https://www.tiktok.com/@thepuppytail"
                    target="_blank"><i className='fab fa-tiktok' ></i></a>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <Login />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
