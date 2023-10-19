
import React, { useState } from "react";
import FilterLocation from "../component/filterLocation";
import Keepers from "../component/keepers";

export const Home = () => {
  const [filters, setFilters] = useState({
    location: "",
    name: "",
    services: "",
    experience: "",
  });
  const [showFilters, setShowFilters] = useState(false);

  const handleFilterChange = (name, value) => {
    setFilters({ ...filters, [name]: value });
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  return (
    <>
      <div className="bottom-squiggle-wrapper container-fluid p-0">
        <img
          src="https://assets.website-files.com/64149f79022d0c5fc8ce46e8/64149f79022d0cc5c4ce4784_Bottom%20Squiggle.svg"
          loading="lazy"
          width="1792"
          height="128"
          alt=""
          className="bottom-squiggle"
        />
      </div>
      <div className="home">
        <div className="container-fluid p-0 d-flex align-items-center justify-content-center main-card">
          <div className="card card-header">
            <div className="card-body text-center">
              <h1 className="card-title landing-title">
                <span className="cuidamos-text">Busca</span> los{" "}
                <span className="mascotas-text">mejores cuidadores</span> para tus mascotas
              </h1>
            </div>
          </div>
        </div>
        <Keepers />
      </div>
      <div className="container-fluid  text-center "></div>
    </>
  );
}; 