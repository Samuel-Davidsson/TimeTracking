import React from "react";
import { Link } from "react-router-dom";

const navigation = () => {
  return (
    <div>
      <Link className="link" value="Register" to="/Timetracker/register">
        Klicka här för att registera dig!
      </Link>
    </div>
  );
};
export default React.memo(navigation);
