import React, { useContext } from "react";
import Perfil from "../../img/avatar.jpg";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

const Keeper = () => {
  const { store, actions } = useContext(Context);
  
  return (
    <div className="row">
      {store.keepers.map((keeper, index) => (
        <div className="col p-3" key={index}>
          <div className="card">
            <img src={Perfil} className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">{keeper.first_name}</h5>
              <p className="card-text">{keeper.description}</p>
            </div>
            <button
              type="button"
              className="btn btn-link"
              style={{ textDecoration: "none" }}
            >
              <Link to={`/profile/${keeper.id}`} style={{ color: "black", textDecoration: "none" }}>
                See more...
              </Link>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Keeper;
