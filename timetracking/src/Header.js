import React from "react";
import { Jumbotron } from "reactstrap";
import "./App.css";

const header = props => {
  return (
    <div>
      <Jumbotron className="jumbotron-border">
        <h2 className="header-title">{props.title}</h2>
        <p className="header-subtitle">{props.subtitle}</p>
      </Jumbotron>
    </div>
  );
};
export default header;
