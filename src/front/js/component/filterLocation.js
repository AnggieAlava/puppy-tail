import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import locations from "../../json/location.json";
import "../../styles/filterLocation.css";

export const FilterLocation = ({ onLocationChange }) => {
  const { store, actions } = useContext(Context);

  const handleLocationChange = (e) => {
    const selectedLocation = e.target.value;
    onLocationChange(selectedLocation);
  };

  return (
    <>
      <div className="filter-home">
        <select
          className="m-5 form-control"
          id="inputLocationHome"
          defaultValue="0"
          onChange={handleLocationChange}>
          <option value="0" disabled>
            Seleccione su ubicación
          </option>
          {locations.map((location, index) => {
            return (
              <option value={location.es_name} key={index}>
                {location.es_name}
              </option>
            );
          })}
        </select>
      </div>
    </>
  );
};
