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

  );
};