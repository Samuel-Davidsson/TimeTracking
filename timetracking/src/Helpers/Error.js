import React from "react";
const error = props => {
  return (
    <div>
      <p className="text-danger">{props.error}</p>
    </div>
  );
};
export default error;
