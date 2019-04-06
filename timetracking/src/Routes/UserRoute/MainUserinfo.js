import React from "react";
import { ListGroup, ListGroupItem } from "reactstrap";
import Capitalize from "../../Helpers/Capitalize";
import "./UserRoute.css";

class MainUserInfo extends React.Component {
  render() {
    return (
      <div className="mainUserInfo-div">
        <ListGroup>
          <ListGroupItem className="mainInfo-listgroupitem">
            {Capitalize(this.props.firstName)} {Capitalize(this.props.lastName)}
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
