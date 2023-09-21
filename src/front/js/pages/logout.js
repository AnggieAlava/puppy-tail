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
    <li className="nav-item">
      <Link to="/" onClick={handleLogout} className="nav-link">
        Cerrar sesión
      </Link>
    </li>
  );
};
{
  /* {(token === null ? "":<button>Profile</button>)} */
}
