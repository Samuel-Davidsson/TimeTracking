import React from "react";
import { NavLink } from "react-router-dom";
import "../scss/login.scss";

const Navigation = () => {
  return (
    <NavLink
      className="NavLink"
      value="Register"
      to="/Tidsrapporten/registrera"
    >
      Klicka här för att registera dig!
    </NavLink>
  );
};
export default React.memo(Navigation);
