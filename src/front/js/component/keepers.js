import React, { useContext, useEffect } from "react";
import Perfil from "../../img/avatar.jpg";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/keepers.css";

const Keepers = () => {
  const { store, actions } = useContext(Context);
  const limit = 6;
  useEffect(() => {
    actions.keepersToShow(limit);
  }, []);

  return (
    <div>
      {store.keepersToShow.length === 0 ? (
        <div className="alert alert-warning" role="alert">
          <h2>NOT FOUND!</h2>
        </div>
      ) : (
        <div className="row row-cols-1 row-cols-sm-3 g-4 card-wrap">
          {store.keepersToShow.map((keeper, index) => (
            <div className="col p-4 " key={index}>
              <Link
                to="/profile/keeper/id"
                style={{ textDecoration: "none", color: "inherit" }}>
                <div className="card">
                  <img src={Perfil} className="card-img-top" alt="..." />
                  <div className="card-body">
                    <h5 className="card-title">{keeper.first_name}</h5>
                    <p className="card-text">{keeper.description}</p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Keepers;
