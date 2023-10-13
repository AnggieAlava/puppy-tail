import { Context } from "../store/appContext";
import React, { useState, useEffect, useContext } from 'react';
import "../../styles/keepers.css";
import avatar from "../../img/avatar.jpg";
import { FilterLocation } from "../component/filterLocation";
import moment from "moment";
import { Link } from "react-router-dom";

const Keepers = () => {
  const [keepers, setKeepers] = useState([]);
  const [filters, setFilters] = useState({
    first_name: "",
    services: "",
    experience: "",
    location: ""
  });
  const [dataLoaded, setDataLoaded] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const URL = 'https://miniature-invention-wqp577q66v5c5xq6-3001.app.github.dev/api/keeper';
  const [selectedLocation, setSelectedLocation] = useState(null);





  const showData = async () => {
    try {
      const response = await fetch(URL);
      if (!response.ok) {
        throw new Error('No se pudo obtener la información');
      }

      const data = await response.json(); // Parsear la respuesta a JSON
      console.log(data);
      setKeepers(data);
      setDataLoaded(true);
    } catch (error) {
      console.error('Error en la obtención de datos:', error);
    }
  };
  useEffect(() => {
    showData();
  }, []);
  const handleLocationChange = (location) => {
    setSelectedLocation(location);
    filters.location = location
  };
  const handleFilterChange = (name, value) => {
    setFilters({ ...filters, [name]: value });
  };
  function imgErrorHandler(e) {
    e.target.src = avatar;
  }

  const filteredKeepers = dataLoaded
    ? keepers.filter((keeper) => {
      return (
        keeper.first_name.toLowerCase().includes(filters.first_name.toLowerCase()) &&
        keeper.services.toLowerCase().includes(filters.services.toLowerCase()) &&
        calculateExperienceInYears(keeper.experience) >= filters.experience &&
        keeper.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    })
    : [];
  function calculateExperienceInYears(experienceStartDate) {
    const startDate = moment(experienceStartDate);
    const endDate = moment(); // Fecha actual
    const yearsOfExperience = endDate.diff(startDate, "years");
    return yearsOfExperience;
  }
  useEffect(() => {
    showData();
  }, []);
  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  return (
    <div>
      <button onClick={toggleFilters}>
        {showFilters ? "Ocultar Filtros" : "Mostrar Filtros"}
      </button>
      {showFilters && (

        <div className="filter-home">
          <input
            type="text"
            name="first_name"
            placeholder="Nombre del cuidador"
            onChange={(e) => handleFilterChange("first_name", e.target.value)}
          />

          <div className="select-container">
            <select
              name="services"
              onChange={(e) => handleFilterChange("services", e.target.value)}
            >
              <option value="" disabled selected>
                Tipo de trabajo
              </option>
              <option value="Cuidar mascotas">Cuidar mascotas</option>
              <option value="Pasear mascotas">Pasear mascotas</option>
              <option value="Organizar fiesta">Organizar fiesta</option>
            </select>
          </div>
          <input
            type="text"
            name="experience"
            placeholder="Experiencia"
            onChange={(e) => handleFilterChange("experience", e.target.value)}
          />

          <FilterLocation onLocationChange={handleLocationChange} />

        </div>

      )}


      <div className="row row-cols-1 row-cols-sm-3 g-4 card-wrap">

        {filteredKeepers.map((keeper, index) => (
          <div className="col p-4" key={index}>
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
                  <p className="card-text">
                    Servicios:
                    <ul>
                      {keeper.services.map((service, serviceIndex) => (
                        <li key={serviceIndex}>{service}</li>
                      ))}
                    </ul>
                  </p>
                  <p className="card-text">Años de experiencia: {calculateExperienceInYears(keeper.experience)}</p>
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