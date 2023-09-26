import React, { useContext } from "react";
import "../../styles/landing.css";
import { Context } from "../store/appContext";
import { Login } from "./login";

export const Landing = () => {
  const { store, actions } = useContext(Context);

  return (
    <div className="background" id="landing">
      <Login />
    </div>
  );
};
