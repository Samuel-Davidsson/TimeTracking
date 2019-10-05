import React from "react";
import { NavLink } from "react-router-dom";

const navigation = () => {
  return (
    <div>
      <NavLink
        className="login-link"
        value="Register"
        to="/Timetracker/register"
      >
        Klicka här för att registera dig!
      </NavLink>
    </div>
  );
};
export default React.memo(navigation);
