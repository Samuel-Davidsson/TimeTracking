import React from "react";
import AdminForm from "../AdminRoute/AdminForm";
import MainUserInfo from "../UserRoute/MainUserInfo";

const userActiveReport = props => {
  return (
    <div hidden={!props.report}>
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
