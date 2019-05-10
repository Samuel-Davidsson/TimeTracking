import React from "react";

const deviationsInfo = props => {
  if (props.deviationItems === undefined) {
    return null;
  }
  return (
    <div
      className="deviation-list-header"
      hidden={!props.deviationItems.length > 0}
    >
      <h4>Lista med avvikelser</h4>
      <div className="deviation-list-titles">
        <p>Timmar Anledning</p>
      </div>
    </div>
  );
};
export default React.memo(deviationsInfo);
