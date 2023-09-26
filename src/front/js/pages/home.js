import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { FilterLocation } from "../component/filterLocation";
import Keepers from "../component/keepers";

export const Home = () => {
  const { store, actions } = useContext(Context);
  const [selectedLocation, setSelectedLocation] = useState(null);

  const handleLocationChange = (location) => {
    setSelectedLocation(location);
  };

  const handleResetFilter = () => {
    setSelectedLocation(null);
  };

  return (
    <>
      <div className="d-flex justify-content-center align-items-center">
        {selectedLocation !== null && (
          <button className="btn btn-link" onClick={handleResetFilter}>
            <i className="fas fa-undo"></i>
          </button>
        )}
        <FilterLocation onLocationChange={handleLocationChange} />
      </div>
      <Keepers selectedLocation={selectedLocation} />
    </>
  );
};
