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
        accepted={props.accepted}
        handleCheckBoxClicked={props.handleCheckBoxClicked}
      />
      <AdminForm
        reportId={props.report.id}
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
