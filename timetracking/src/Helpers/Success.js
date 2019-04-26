import React from "react";
const success = props => {
  return (
    <div>
      <p className="text-success">{props.success}</p>
    </div>
  );
};
export default success;
