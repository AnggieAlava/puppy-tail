import React, { useState, useEffect } from 'react';
import "../../styles/keepers.css";
import avatar from "../../img/avatar.jpg";
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

  const URL = (process.env.BACKEND_URL + '/api/keeper');

  const showData = async () => {
    try {
      const response = await fetch(URL);
      if (!response.ok) {
        throw new Error('No se pudo obtener la información');
      }

      const data = await response.json();
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
    setFilters({ ...filters, location });
  };

  const handleFilterChange = (name, value) => {
    setFilters({ ...filters, [name]: value });
  };

  function imgErrorHandler(e) {
    e.target.src = avatar;
  }

  function filterKeepers() {
    return keepers.filter((keeper) => {
      const nameMatches = filters.first_name ? keeper.first_name.toLowerCase().includes(filters.first_name.toLowerCase()) : true;
      const serviceMatches = filters.services === "" || keeper.services.includes(filters.services);
      const experienceMatches = filters.experience === "" || calculateExperienceInYears(keeper.experience) >= parseInt(filters.experience);
      const locationMatches = filters.location ? keeper.location.toLowerCase().includes(filters.location.toLowerCase()) : true;

      return nameMatches && serviceMatches && experienceMatches && locationMatches;
    });
  }

  function calculateExperienceInYears(experienceStartDate) {
    const startDate = moment(experienceStartDate);
    const endDate = moment();
    const yearsOfExperience = endDate.diff(startDate, "years");
    return yearsOfExperience;
  }

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  return (
    <div>
      {/* <div className="filter-container">
        <button className="show-filters-button" onClick={toggleFilters}>
          {showFilters ? "Ocultar Filtros" : "Mostrar Filtros"}
        </button>
        {showFilters  && ( */}
      <div className="filter-home" >
        <input
          type="text"
          name="first_name"
          placeholder="Nombre del cuidador"
          className="text-black"
          value={filters.first_name}
          onChange={(e) => handleFilterChange("first_name", e.target.value)}
        />
        <div className="select-container">
          <select
            name="services"
            style={{ color: "gray" }}
            value={filters.services}
            onChange={(e) => handleFilterChange("services", e.target.value)}
          >
            <option value="0" disabled>

              Tipo de trabajo
            </option>
            <option value="Cuidar mascotas" style={{ color: "gray" }}>
              Cuidar mascotas
            </option>
            <option value="Pasear mascotas" style={{ color: "gray" }}>
              Pasear mascotas
            </option>
            <option value="Organizar fiesta" style={{ color: "gray" }}>
              Organizar fiesta
            </option>
          </select>
        </div>
        <input
          type="text"
          name="experience"
          placeholder="Experiencia"
          value={filters.experience}
          onChange={(e) => handleFilterChange("experience", e.target.value)}
        />
        <input
          type="text"
          name="location"
          placeholder="Ubicación"
          value={filters.location}
          onChange={(e) => handleFilterChange("location", e.target.value)}
        />


        <button
          className="clear-filters-button"
          onClick={() => {
            setFilters({
              first_name: "",
              services: "",
              experience: "",
              location: "",
            });
          }}
        >
          Borrar filtros
        </button>
      </div>

      {/* )}
      </div> */}

      <div className="row row-cols-1 row-cols-sm-3 g-4 card-wrap">
        {filterKeepers().map((keeper, index) => (
          <div className="col p-4" key={index}>
            <div className="card card-profile-home">
              <div className="row no-gutters">
                <div className="col-md-4">
                  <img
                    onError={imgErrorHandler}
                    src={keeper.profile_pic}
                    className="card-img object-fit-cover"
                    alt="..."
                    style={{width:"100%",height:"100%", objectFit:"cover", borderRadius:"10px 10px 0 0"}}
                  />
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h5 className="card-title">
                      {keeper.first_name} {keeper.last_name}
                    </h5>

                    <h6 className="card-text">{keeper.location}</h6>
                    <p className="card-text">Años de experiencia: {calculateExperienceInYears(keeper.experience)}</p>
                    <p className="card-text">Tarifa: {keeper.hourly_pay} por hora</p>
                    <Link
                      to={`/profile/keeper/${keeper.id}`}
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <button className="btn-primary"
                        onClick={() =>
                          localStorage.setItem("keeper", JSON.stringify(keeper))
                        }
                      >
                        Reservar
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

      </div>
    </div>
  );
};

export default Keepers;