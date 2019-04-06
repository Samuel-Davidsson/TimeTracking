import React from "react";
import { Jumbotron } from "reactstrap";
import "./App.css";

class Header extends React.Component {
  render() {
    return (
      <div>
        <Jumbotron className="jumbotron-border">
          <h2 className="header-title">{this.props.title}</h2>
          <p className="header-subtitle">{this.props.subtitle}</p>
        </Jumbotron>
      </div>
    );
  }
}
export default Header;
