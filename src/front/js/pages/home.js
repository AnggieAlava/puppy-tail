import React, { useContext } from "react";
import { Context } from "../store/appContext";
import Card from "../component/card";
import BarSearch from "../component/barSearch";
import { Logout } from "./logout";

export const Home = () => {
  const { store, actions } = useContext(Context);
  return (
    <>
      <BarSearch />
      <div className="container">
        <div className="row row-cols-1 row-cols-md-3 g-4">
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
        </div>
      </div>
      <Logout />
    </>
  );
};
