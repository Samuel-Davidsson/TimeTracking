import React from "react";
export default class Error extends React.Component {
  render() {
    return (
      <div>
        <p className="text-danger">{this.props.errormsg}</p>
      </div>
    );
  }
}
