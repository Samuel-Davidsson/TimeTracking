import React from "react";
import { Jumbotron } from "reactstrap";

class Header extends React.Component {
  render() {
    return (
      <Jumbotron className="jumbotron-border">
        <h1 className="header-title">{this.props.title}</h1>
        <h4 className="header-subtitle">{this.props.subtitle}</h4>
      </Jumbotron>
    );
  }
}
export default Header;
