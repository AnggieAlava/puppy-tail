import React from "react";

const BarSearch = () => {
  return (
    <div className="container p-4">
      <div className="row height d-flex justify-content-center align-items-center">
        <div className="col-md-8">
          <div className="search">
            <input
              type="text"
              className="form-control"
              placeholder="Encuentra a los cuidadores mas cercanos a ti"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BarSearch;
