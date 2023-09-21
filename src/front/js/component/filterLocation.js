import React, { useContext } from "react";
import { Context } from "../store/appContext";
import locations from "../../json/location.json";

export const FilterLocation = () => {
  const { store, actions } = useContext(Context);
  return (
    <>
      <select defaultValue="0" onChange={(e) => console.log(e.target.value)}>
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
    </>
  );
};
