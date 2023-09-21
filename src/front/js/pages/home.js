import React, { useContext } from "react";
import { Context } from "../store/appContext";
// import BarSearch from "../component/barSearch";
import Keepers from "../component/keepers";
import {FilterLocation} from "../component/filterLocation"
// import locations from "../../json/location.json";

export const Home = () => {
  const { store, actions } = useContext(Context);
  return (
    <>
      {/* <BarSearch /> */}
     <FilterLocation/>
      <Keepers />
    </>
  );
};
