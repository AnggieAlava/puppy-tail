import React, { useContext } from "react";
import { Context } from "../store/appContext";
import BarSearch from "../component/barSearch";
import Keeper from "../component/keepers";



export const Home = () => {
  const { store, actions } = useContext(Context);
  return (
    <>
      <BarSearch />
      <div className="container">
        <div className="row row-cols-1 row-cols-md-3 g-4">
          <Keeper />
          <Keeper />
          <Keeper />
          <Keeper />
          <Keeper />
          <Keeper />
        </div>
      </div>
    </>
  );
};
