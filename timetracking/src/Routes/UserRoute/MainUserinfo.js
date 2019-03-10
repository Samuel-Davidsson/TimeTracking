import React from "react";
import Capitalize from "../../Helpers/Capitalize";

class MainInfo extends React.Component {
  firstname = localStorage.getItem("firstname");
  lastname = localStorage.getItem("lastname");

  render() {
    return (
      <div className="MainUserinfo-div">
        <p>
          {Capitalize(this.firstname)} {Capitalize(this.lastname)}
        </p>
        <p>Hours: {this.props.totalHours}</p>
        <p>Godkänd: attest.status checkbox</p>
      </div>
    );
  }
}
export default MainInfo;
