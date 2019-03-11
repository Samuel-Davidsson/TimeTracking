import React from "react";
import { ListGroup, ListGroupItem } from "reactstrap";
import Capitalize from "../../Helpers/Capitalize";

class MainInfo extends React.Component {
  firstname = localStorage.getItem("firstname");
  lastname = localStorage.getItem("lastname");

  render() {
    return (
      <div className="MainUserInfo-div">
        <ListGroup className="bg-dark">
          <ListGroupItem className="bg-dark">
            {Capitalize(this.firstname)} {Capitalize(this.lastname)}
          </ListGroupItem>
          <ListGroupItem className="bg-dark">
            Totala timmar : {this.props.totalHours}
          </ListGroupItem>
          <ListGroupItem className="bg-dark">
            Godkänd :
            <input
              className="maininfo-checkbox"
              readOnly
              checked={this.props.attest}
              onChange={this.props.handleCheck}
              disabled={!this.props.isAdmin}
              type="checkbox"
            />
          </ListGroupItem>
        </ListGroup>
      </div>
    );
  }
}
export default MainInfo;
