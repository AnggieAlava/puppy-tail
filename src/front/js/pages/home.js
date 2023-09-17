import React, { useContext } from "react";
import { Context } from "../store/appContext";
import BarSearch from "../component/barSearch";
import Keepers from "../component/keepers";



export const Home = () => {
  const { store, actions } = useContext(Context);
  return (
    <>
      <BarSearch />
      
          <Keepers />
    </>
  );
};









