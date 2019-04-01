import React from "react";
import { ListGroup, ListGroupItem } from "reactstrap";
import Capitalize from "../../Helpers/Capitalize";

class MainUserInfo extends React.Component {
  render() {
    return (
      <div className="mainUserInfo-div">
        <ListGroup>
          <ListGroupItem className="listGroupItem">
            {Capitalize(this.props.firstName)} {Capitalize(this.props.lastName)}
          </ListGroupItem>
          <ListGroupItem className="listGroupItem">
            Totala timmar: {this.props.totalHours}
          </ListGroupItem>
          <ListGroupItem className="listGroupItem">
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
