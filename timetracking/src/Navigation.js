import React from "react";
import { NavLink } from "react-router-dom";

const Navigation = () => {
  return (
    <div>
      <p>Inte registrerad klicka på länken</p>
      <NavLink className="test" to="register">
        Register
      </NavLink>
    </div>
  );
};
export default Navigation;
