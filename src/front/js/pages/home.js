import React, { useContext } from "react";
import { Context } from "../store/appContext";
import Card from "../component/card";
import BarSearch from "../component/barSearch";
<<<<<<< HEAD
import { Logout } from "./logout";
=======
>>>>>>> c793093afec4f41a6a73af50d1c173c27cce66ec
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
<<<<<<< HEAD
      <Logout />
=======
>>>>>>> c793093afec4f41a6a73af50d1c173c27cce66ec
    </>
  );
};
