import React, { useState, useEffect, useContext } from "react";
import avatar from "../../img/avatar.jpg";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/keepers.css";
const Keepers = ({ selectedLocation }) => {
  const { store, actions } = useContext(Context);
  useEffect(() => {
    actions.getKeepers();
  }, []);
  const filteredKeepers = selectedLocation
    ? store.getKeepers.filter((keeper) => keeper.location === selectedLocation)
    : store.getKeepers;
  function imgErrorHandler(e) {
    e.target.src = avatar;
  }
  return (
    <div>
      <div className="row row-cols-1 row-cols-sm-3 g-4 card-wrap">
        {filteredKeepers.map((keeper, index) => (
          <div className="col p-4 " key={index}>
            <Link
              to={"/profile/keeper/" + keeper.id}
              onClick={() =>
                localStorage.setItem("keeper", JSON.stringify(keeper))
              }
              style={{ textDecoration: "none", color: "inherit" }}>
              <div className="card">
                <img
                  onError={imgErrorHandler}
                  src={keeper.profile_pic}
                  className="card-img-top"
                  alt="..."
                />
                <div className="card-body">
                  <h5 className="card-title">
                    {keeper.first_name} {keeper.last_name}
                  </h5>
                  <h6 className="card-text">{keeper.location}</h6>
                  <p className="card-text">{keeper.description}</p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Keepers;