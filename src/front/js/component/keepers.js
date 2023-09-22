import React, { useContext, useEffect } from "react";
import avatar from "../../img/avatar.jpg";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/keepers.css";

const Keepers = () => {
  const { store, actions } = useContext(Context);
  const limit = 6;
  useEffect(() => {
    actions.keepersToShow(3);
  }, []);

  function imgErrorHandler(e){
    e.target.src = avatar
}
  return (
    <div className="row row-cols-1 row-cols-sm-3 g-4">
      {store.keepersToShow.map((keeper, index) => (
        <div className="col p-4" key={index}>
          <div className="card">
            <img onError={imgErrorHandler} src={keeper.profile_pic} className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">{keeper.first_name}</h5>
              <p className="card-text">{keeper.description}</p>
            </div>
            <button
              type="button"
              className="btn btn-link"
              style={{ textDecoration: "none" }}>
              <Link
                to={"/profile/"+"keeper"+"/"+keeper.id} onClick={()=>localStorage.setItem("keeper",JSON.stringify(keeper))}
                style={{ color: "black", textDecoration: "none" }}>
                See more...
              </Link>
            </button>
          </div>
        </div>
      ))}
    </div>
  )
};
export default Keepers;
