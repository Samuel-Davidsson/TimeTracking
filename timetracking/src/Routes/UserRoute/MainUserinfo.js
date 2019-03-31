import React from "react";
import { ListGroup, ListGroupItem } from "reactstrap";
import Capitalize from "../../Helpers/Capitalize";

class MainUserInfo extends React.Component {
  render() {
    return (
      <div className="mainUserInfo-div">
        <ListGroup className="bg-dark">
          <ListGroupItem className="bg-dark">
            {Capitalize(this.props.firstName)} {Capitalize(this.props.lastName)}
          </ListGroupItem>
          <ListGroupItem className="bg-dark">
            Totala timmar : {this.props.totalHours}
          </ListGroupItem>
          <ListGroupItem className="bg-dark">
            Godkänd :
            <input
              checked={this.props.attest}
              type="checkbox"
              onChange={this.props.handleCheckBoxClicked}
            />
          </ListGroupItem>
        </ListGroup>
      </div>
    );
  }
}
export default MainUserInfo;
