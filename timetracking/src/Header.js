import React from "react";
import { Jumbotron } from "reactstrap";
import "./App.css";
import Capitalize from "./Helpers/Capitalize";

class Header extends React.Component {
  render() {
    return (
      <div>
        <Jumbotron className="jumbotron-border">
          <h2 className="header-title">{this.props.title}</h2>
          <h2 hidden={this.props.month === ""}>
            Rapport för {Capitalize(this.props.month)}
          </h2>
          <p className="header-subtitle">{this.props.subtitle}</p>
        </Jumbotron>
      </div>
    );
  }
}
export default Header;
