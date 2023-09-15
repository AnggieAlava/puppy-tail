import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const Logout = () => {
  const { store, actions } = useContext(Context);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (store.accessToken) {
      actions.getUserInfo().then((data) => setUserData(data));
    }
  }, [store.accessToken]);

  const handleLogout = () => {
    actions.logout();
    navigate("/");
  };

  return (
    <div className="container">
      <Link to="/">
        <button onClick={handleLogout} className="btn btn-danger">
          Logout
        </button>
      </Link>
    </div>
  );
};
