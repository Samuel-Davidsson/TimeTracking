import React from "react";
import Capitalize from "../../Helpers/Capitalize";

export default class MainInfo extends React.Component {
  firstName = localStorage.getItem("firstname");
  lastName = localStorage.getItem("lastname");

  render() {
    return (
      <div className="MainUserinfo-div">
        <p>
          {Capitalize(this.firstname)} {Capitalize(this.lastname)}
        </p>
        <p>Hours: 0</p>
      </div>
    );
  }
}
