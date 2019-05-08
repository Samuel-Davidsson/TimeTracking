import React from "react";
import { NavLink } from "react-router-dom";

const Navigation = () => {
  return (
    <div>
      <NavLink
        className="login-link"
        value="Register"
        to="timetracker/register"
      >
        Klicka här för att registera dig!
      </NavLink>
    </div>
  );
};
export default Navigation;
