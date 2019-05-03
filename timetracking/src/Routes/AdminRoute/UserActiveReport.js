import React from "react";
import MainUserInfo from "../UserRoute/MainUserInfo";
import AdminForm from "../AdminRoute/AdminForm";

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
      <AdminForm
        attest={props.attest}
        accepted={props.accepted}
        handleAttestCheckBoxStatus={props.handleAttestCheckBoxStatus}
        handleAcceptedCheckBoxStatus={props.handleAcceptedCheckBoxStatus}
        handleCheckboxesSubmit={props.handleCheckboxesSubmit}
      />
    </div>
  );
};
export default userActiveReport;
