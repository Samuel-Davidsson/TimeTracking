import React from "react";
import DeviationsInfo from "./DeviationInfo";
import DeviationItem from "./DeviationItem";

const deviationList = props => {
  return (
    <div className="deviationlist-main-div">
      <DeviationsInfo deviationItems={props.deviationItems} />
      <DeviationItem
        handleSubmit={props.handleSubmit}
        handleHoursChange={props.handleHoursChange}
        handleDescriptionChange={props.handleDescriptionChange}
        deviationItems={props.deviationItems}
        isValidMonth={props.isValidMonth}
      />
    </div>
  );
};
export default React.memo(deviationList);
