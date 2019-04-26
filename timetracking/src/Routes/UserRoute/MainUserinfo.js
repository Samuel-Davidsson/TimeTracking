import React from "react";
import { ListGroup, ListGroupItem } from "reactstrap";
import "./UserRoute.css";

const mainUserInfo = props => {
  return (
    <div hidden={props.firstName === ""} className="mainUserInfo-div">
      <ListGroup>
        <ListGroupItem className="mainInfo-listgroupitem">
          {props.firstName} {props.lastName}
        </ListGroupItem>
        <ListGroupItem className="mainInfo-listgroupitem">
          Totala timmar: {props.totalHours}
        </ListGroupItem>
        <ListGroupItem className="mainInfo-listgroupitem">
          Godkänd:
          <input
            className="mainInfo-checkbox-status"
            readOnly
            checked={props.attest}
            style={{
              backgroundColor: props.attest ? "DarkSeaGreen" : "IndianRed"
            }}
          />
        </ListGroupItem>
      </ListGroup>
    </div>
  );
};
export default mainUserInfo;
