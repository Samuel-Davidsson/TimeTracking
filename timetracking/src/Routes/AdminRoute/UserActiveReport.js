import React from "react";
import Capitalize from "../../Helpers/Capitalize";
import MainUserInfo from "../UserRoute/MainUserInfo";

export default class UserActiveReport extends React.Component {
  currentYear = new Date().getFullYear();
  currentMonth = new Date().getMonth();
  activeReportDate = new Date(this.currentYear, this.currentMonth);
  month = this.activeReportDate.toLocaleString(this.locale, { month: "long" });

  render() {
    return (
      <div>
        <h2>Rapport för {Capitalize(this.month)}</h2>
        <MainUserInfo
          firstName={this.props.firstName}
          lastName={this.props.lastName}
          totalHours={this.props.totalHours}
          attest={this.props.attest}
          handleCheckBoxClicked={this.props.handleCheckBoxClicked}
        />
        {/* <DeviationList /> */}
      </div>
    );
  }
}
