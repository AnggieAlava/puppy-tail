import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import countryCodes from "../../json/countryCodes.json";

export const PhoneNumber = ({ onPhoneNumberChange }) => {
  const { store, actions } = useContext(Context);

  const handlePhoneNumberChange = (e) => {
    const selectedPhoneNumber = e.target.value;
    onPhoneNumberChange(selectedPhoneNumber);
  };

  return (
    <>
      <div className="mb-6">
        <label htmlFor="inputPhoneNumber" className="form-label">
          Codigo celular
        </label>
        <select
          className="form-control"
          id="inputCountryCode"
          defaultValue="0"
          onChange={(e) => setSelectedCountryCode(e.target.value)}>
          <option value="0" disabled>
            Seleccione su código de país
          </option>
          {countryCodes.map((code, index) => {
            return (
              <option value={code.dial_code} key={index}>
                {code.dial_code}
              </option>
            );
          })}
        </select>
      </div>
    </>
  );
};
