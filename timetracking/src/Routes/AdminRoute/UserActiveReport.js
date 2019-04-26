import React from "react";
import MainUserInfo from "../UserRoute/MainUserInfo";

const userActiveReport = props => {
  return (
    <div>
      <MainUserInfo
        firstName={props.firstName}
        lastName={props.lastName}
        totalHours={props.totalHours}
        attest={props.attest}
        handleCheckBoxClicked={props.handleCheckBoxClicked}
      />
    </div>
  );
};
export default userActiveReport;
