import React from "react";
import { ListGroup, ListGroupItem } from "reactstrap";
import "./UserRoute.css";

class MainUserInfo extends React.Component {
  render() {
    return (
      <div hidden={this.props.firstName === ""} className="mainUserInfo-div">
        <ListGroup>
          <ListGroupItem className="mainInfo-listgroupitem">
            {this.props.firstName} {this.props.lastName}
          </ListGroupItem>
          <ListGroupItem className="mainInfo-listgroupitem">
            Totala timmar: {this.props.totalHours}
          </ListGroupItem>
          <ListGroupItem className="mainInfo-listgroupitem">
            Godkänd:
            <input
              className="mainInfo-checkbox-status"
              readOnly
              checked={this.props.attest}
              style={{
                backgroundColor: this.props.attest
                  ? "DarkSeaGreen"
                  : "IndianRed"
              }}
            />
          </ListGroupItem>
        </ListGroup>
      </div>
    );
  }
}
export default MainUserInfo;
