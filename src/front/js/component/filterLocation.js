import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/login.css";
import locations from "../../json/location.json";

export const FilterLocation = () => {
  const { store, actions } = useContext(Context);
  return (
    <>
      <div className="mb-3">
        <label htmlFor="inputLocation" className="form-label">
          Pais
        </label>
        <select
          className="form-control"
          id="inputLocation"
          defaultValue="0"
          onChange={(e) => console.log(e.target.value)}>
          <option value="0" disabled>
            Seleccione una opcion
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
