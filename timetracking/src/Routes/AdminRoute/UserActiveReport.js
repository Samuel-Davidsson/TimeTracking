import React from "react";
import MainUserInfo from "../UserRoute/MainUserInfo";

export default class UserActiveReport extends React.Component {
  render() {
    return (
      <div>
        <MainUserInfo
          firstName={this.props.firstName}
          lastName={this.props.lastName}
          totalHours={this.props.totalHours}
          attest={this.props.attest}
          handleCheckBoxClicked={this.props.handleCheckBoxClicked}
        />
      </div>
    );
  }
}
