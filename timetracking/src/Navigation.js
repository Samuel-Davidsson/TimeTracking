import React from "react";
import { NavLink } from "react-router-dom";

const Navigation = () => {
  return (
    <div>
      <p>Inget konto?</p>
      <NavLink className="test" value="Register" to="register">
        Klicka här för att registera dig!
      </NavLink>
    </div>
  );
};
export default Navigation;
