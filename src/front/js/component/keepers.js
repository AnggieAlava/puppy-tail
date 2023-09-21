import React, { useContext, useEffect } from "react";
import Perfil from "../../img/avatar.jpg";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/keepers.css";

const Keepers = () => {
  const { store, actions } = useContext(Context);
  useEffect(() => {
    actions.getKeepers();
  }, []);

  return (
    <div>
      {store.getKeepers.length === 0 ? (
        <div className="alert alert-warning" role="alert">
          <h2>Keepers not found!</h2>
        </div>
      ) : (
        <div className="row row-cols-1 row-cols-sm-3 g-4 card-wrap">
          {store.getKeepers.map((keeper, index) => (
            <div className="col p-4 " key={index}>
              <div className="card">
                <img src={Perfil} className="card-img-top" alt="..." />
                <div className="card-body">
                  <h5 className="card-title">{keeper.first_name}</h5>
                  <p className="card-text">{keeper.description}</p>
                  <p className="card-text">{keeper.location}</p>
                </div>
                <button
                  type="button"
                  className="btn btn-link"
                  style={{ textDecoration: "none" }}>
                  <Link
                    to="/profile"
                    style={{ color: "black", textDecoration: "none" }}>
                    See more...
                  </Link>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Keepers;
